import React from 'react'
import Header from '../../components/Header';
import { getSession } from 'next-auth/react';
import { PlusIcon, RefreshIcon, XIcon } from '@heroicons/react/outline';
import {addDoc, collection,arrayUnion, serverTimestamp, updateDoc,doc} from 'firebase/firestore';
import { getDownloadURL, uploadString,ref } from 'firebase/storage';
import { useState,useRef } from 'react';
import { useRouter } from 'next/router';
import {db,storage} from '../../firebase';
const New = ({user}) => {


    const [selectedFiles,setSelectedFiles] = useState([]);
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [brand,setBrand] = useState("");
    const [price,setPrice] = useState("");
    const [loading,setLoading] = useState(false);
    const filePickerRef = useRef(null);
    const router = useRouter();

    const addImageToPost = async (e) => {
        if(e.target.files){
            const selectedImages = [...selectedFiles];
            await Promise.all(
                [...e.target.files].map((file)=>{
                    let reader = new FileReader();
                    return new Promise(resolve => {
                
                        // Resolve the promise after reading file
                        reader.onload = (readerEvent) => {
                            selectedImages.push({url:readerEvent.target.result,name:file.name});
                            resolve()
                        }
                        
                        // Reade the file as a text
                        reader.readAsDataURL(file);
                        
                    });
                })
            )
            setSelectedFiles(selectedImages);
        }
       
    }

    const uploadPost = async () => {
        if(loading) return

        setLoading(true);

        const docRef = await addDoc(collection(db,'articles'),{
            likers:[],
            price:parseInt(price),
            title,
            description,
            brand,
            likes:0,
            sellerImg:user.image,
            sellerUsername:user.name,
            sellerEmail:user.email,
            timestamp:serverTimestamp(),
            img:[]
        })

        for(let image of selectedFiles){
            const imageRef = ref(storage, `articles/${docRef.id}/${image.name}`);
            await uploadString(imageRef,image.url,"data_url").then(async(snapshot)=> {
                const downloadUrl = await getDownloadURL(imageRef);
                await updateDoc(doc(db,"articles",docRef.id),{
                    img:arrayUnion(downloadUrl)
                });
            }).catch(e=>console.log(e))
        }    

        router.push("/member/profil");
        setLoading(false);
        setSelectedFiles([]);

    } 

  return (
    <div className='bg-[#F2F2F2] w-full pb-6'>
        <div className='sticky top-0 z-20'>
            <Header user={user} />
        </div>
        <div className=' max-w-[960px] header-breakpoint:mx-auto mx-4 mt-10'>
            <h1 className='mb-8 text-2xl font-semibold '>Vends ton article</h1>
            <div className='bg-white p-4 text-black w-full mx-auto'>
                <div>
                    <input multiple='multiple' onChange={(e)=> addImageToPost(e)}  ref={filePickerRef} hidden type="file" />
                    <p className='mb-8 text-sm'> Ajoute jusqu'a 20 photos.<span className='hover:cursor-pointer text-[#0e8c93]'> Voir astuces</span></p>
                    <div className={`border rounded-md border-dashed border-gray-200  p-2 mx-auto flex-wrap flex items-center ${selectedFiles.length===0 ? 'justify-center p-20':'justify-start'}`}>
                    {
                        
                        selectedFiles && selectedFiles.map((selectedFile,i)=>{

                            return <div key={i} className='relative  w-[30%] md:w-[18%] md:pt-[18%] h-0 pt-[30%] m-2'>
                                <XIcon className='absolute  z-10 text-black w-6 p-1 top-2 right-2 rounded-lg bg-white' />
                                <img  className='w-full h-full absolute top-0  object-cover rounded-md' src={selectedFile.url} />
                                <RefreshIcon className='absolute text-black w-6 p-1 bottom-2 right-2 rounded-lg bg-white' />
                             </div>
                        })
                    }
                        <button onClick={()=> filePickerRef.current.click()}   className='border flex border-[#0e8c93]  p-3 ml-10 rounded-sm text-[#0e8c93] '><PlusIcon className='w-6'/> <span className={`${selectedFiles.length>0?'hidden':''}`} >Ajoute des photos</span></button>
                    </div>
                </div>
            </div>

            <div className='my-6 bg-white'>
                <div className='p-6 border-b border-b-gray-300'>
                    <p className='flex flex-col md:flex-row text-lg md:items-center justify-between'>
                        <label className='flex-1'>Titre</label>
                        <input onChange={(e)=> setTitle(e.target.value)} className='flex-1 border-b border-b-gray-300 outline-none focus:border-b-[#0e8c93]' placeholder='ex: chemise sezanne verte'></input>
                    </p>
                </div>

                <div className='p-6 border-b border-b-gray-300'>
                    <p className='flex flex-col md:flex-row text-lg items-start justify-between'>
                        <label className='flex-1'>Decris ton article</label>
                        <textarea onChange={(e)=> setDescription(e.target.value)}  rows={5} className='resize-none  flex-1 border-b border-b-gray-300 outline-none w-full focus:border-b-[#0e8c93]' placeholder='ex: porté quelque fois,taille correctement'></textarea>
                    </p>
                </div>
            </div>

            <div className='my-6 bg-white'>
                <div className='p-6 border-b border-b-gray-300'>
                    <p className='flex flex-col md:flex-row  text-lg md:items-center justify-between'>
                        <label className='flex-1'>Marque</label>
                        <input onChange={(e)=> setBrand(e.target.value)}  type="text" className='flex-1 border-b border-b-gray-300 outline-none focus:border-b-[#0e8c93]' placeholder='Nike'></input>
                    </p>
                </div>
            </div>


            <div className='my-6 bg-white'>
                <div className='p-6 border-b border-b-gray-300'>
                    <p className='flex flex-col md:flex-row  text-lg md:items-center justify-between'>
                        <label className='flex-1'>Prix</label>
                        <input onChange={(e)=> setPrice(e.target.value)} type="number" className='flex-1 border-b border-b-gray-300 outline-none focus:border-b-[#0e8c93]' placeholder='0,00 &euro;'></input>
                    </p>
                </div>
            </div>

            <div>
                <p className='text-sm'>
                Un vendeur professionnel se faisant passer pour un consommateur ou un non-professionnel sur Vinted encourt les sanctions prévues à  <span className='text-[#0e8c93]'>l'Article L. 132-2 </span>du Code de la Consommation.
                </p>
            </div>

            <div className='flex mt-4  sm:justify-end text-white' >
                <button  disabled={loading || title.length===0 ||
                selectedFiles.length===0 || description.length===0
                || brand.length===0 || price.length===0}  onClick={uploadPost} className='cursor-pointer disabled:opacity-50 bg-[#0e8c93] py-2 w-full sm:w-1/5 px-4 rounded-md'>{loading ? <span>Patientez</span> : <span>Ajouter</span>}</button>
            </div>

        </div>
    </div>
  )
}


export async function getServerSideProps(context) {
    const session = await getSession(context)
  
    if(session){
      return {
        props: { user:session.user }
      }
    }else{
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          }
    }
    
  }

export default New