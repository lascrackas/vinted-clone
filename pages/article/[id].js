import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React,{useEffect} from 'react'
import { useState } from 'react';
import Header from '../../components/Header';
import {db} from '../../firebase';
import { getSession } from 'next-auth/react';
import { ClockIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import Head from 'next/head';
const Article = ({user}) => {

    const router = useRouter();
    const [article,setArticle] = useState(null);


    useEffect(()=> {
        const fetchData = async () => {
            const {id} = router.query;
            const articleRef = doc(db,"articles",id);
            const article = await getDoc(articleRef);
            setArticle(article.data());
        }
        fetchData();
    },[])


    return (
    <div className="bg-gray-100 min-w-[360px]">
      <Head>
        <title>{article?.title}</title>
      </Head>
        <div className='sticky top-0'>
            <Header user={user} />
        </div>

    <div className='grid grid-cols-1 header-breakpoint:grid-cols-3'>
      <div className='header-breakpoint:col-span-2'>
        <div className='flex min-w-[360px]'>
           <div className='flex-1 h-60 sm:h-72 header-breakpoint:h-[420px] overflow-hidden mr-1'>
              <img   src={article?.img[0]}  alt="article image" />
            </div>
            <div className='flex-1 h-60' >
              <div className='w-full h-[116px] sm:h-36   header-breakpoint:h-52 overflow-hidden mb-1'>
                <img className='w-full h-[116px] sm:h-36 header-breakpoint:h-52 object-cover'  src={article?.img[1]}  />
              </div>
              <div className='w-full h-[116px] sm:h-36   header-breakpoint:h-52 overflow-hidden '>
                <img className='w-full h-[116px] sm:h-36 header-breakpoint:h-52 object-cover' src={article?.img[2]}  />

              </div>
            </div>
        </div>
      </div>

      <div className='  header-breakpoint:col-span-1'>
        <div className='bg-white p-4 m-4'>
        <p className='text-2xl mb-3 font-semibold'>{article?.price.toFixed(2)} &euro;</p>
        <p className='mb-2 p-2'>Pour tout achat effectué par le biais du bouton "Acheter", nous appliquons des frais couvrant notre
          <span className='text-[#0e8c93]'>protection des acheteurs.</span>Cette protection des acheteurs comprend <span className='text-[#0e8c93]'>notre politique de remboursement</span>
        </p>
        <div className='flex border-t border-t-gray-200 pt-2'>
          <div className='w-full uppercase text-sm'>
            <p>Marque</p>
            <p>Etat</p>
            <p>Emplacement</p>
            <p>Mode de paiement</p>
            <p>Nombre de vues</p>
            <p>Ajouté</p>
          </div>
          <div className='w-full uppercase text-sm'>
            <p>Nike</p>
            <p>Nike</p>
            <p>Nike</p>
            <p>Nike</p>
          </div>
        </div>

        <div className='border-t border-t-gray-200 p-2'>
          <p className='text-lg'>{article?.title}</p>
          <p>{article?.description}</p>
          <p className='mt-2 pb-2 pt-2 border-t border-b border-b-gray-200 border-t-gray-200 flex items-center justify-between'>
            <span>Envoi</span>
            <span>3,00 &euro;</span>
          </p>
          <div className='flex flex-col'>
            <button className='w-full border border-[#0e8c93] text-white bg-[#0e8c93] rounded-md m-2 p-1'>Acheter</button>
            <button className='w-full border border-[#0e8c93] text-[#0e8c93]  rounded-md m-2 p-1'>Faire une offre</button>
            <button className='w-full border border-[#0e8c93] text-[#0e8c93] rounded-md m-2 p-1'>Envoyer un message</button>
          </div>
        </div>

        </div>

          <div className='p-4 m-4 bg-white text-sms'>
            <p className='flex items-start py-1 space-x-1'><img className='w-8 rounded-full' src={article?.sellerImg} alt="seller picture" />  <span>{article?.sellerUsername}</span></p>
            <p className='flex items-center py-1 space-x-1'><LocationMarkerIcon className='w-6' /> Paris, France</p>
            <p className='flex items-center py-1 space-x-1'><ClockIcon className='w-6' /> Vu la derniere fois : il y a une heure</p>
          </div>
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
        props:{user:null}
      }
    }
    
  }
  


export default Article