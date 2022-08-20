import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header';
import { getSession } from 'next-auth/react';
import {  ChevronRightIcon,CheckCircleIcon,LocationMarkerIcon,WifiIcon,StarIcon } from '@heroicons/react/outline';
import { useState,useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import Article from '../../components/Article';

import {db} from '../../firebase';

const profil = ({user}) => {

    const [active, setActive] = useState("Dressing");
    const [articles,setArticles] = useState([]);


    useEffect(()=> {
        const fetchData = async () => {

            const q = query(collection(db, "articles"),where("sellerEmail",'==',user.email));
            const querySnapshot = await getDocs(q);
            setArticles(querySnapshot.docs.map((doc)=>{return {...doc.data(),id:doc.id}}))
        }
        fetchData();
    },[])



  return (
    <div>
         <Head>
        <title>Vinted | Achete vends ou échange</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
      </Head>
        <div className='sticky top-0 z-10'>
            <Header user={user} />
        </div>
        <div className='flex items-center justify-around border-t border-t-gray-300 border-b  mt-2 text-sm border-b-gray-300'>
            
            
            <div onClick={()=> setActive("Dressing")} className={`flex-1 border-b-2 ${active==="Dressing" ?" border-b-[#0e8c93] text-black":" text-gray-500 border-b-transparent"}`}>
                <div  className='hover:bg-gray-100 flex-1 p-3 text-center'>
                    <p>Dressing</p>
                </div>
            </div>


            <div onClick={()=> setActive("Evaluations")} className={`flex-1 border-b-2 ${active==="Evaluations" ?" border-b-[#0e8c93] text-black":"text-gray-500 border-b-transparent"}`}>
                <div  className={`hover:bg-gray-100 flex-1 p-3 text-center`}>
                    <p>Evaluations</p>
                </div>
            </div>

            <div onClick={()=> setActive("A propos")} className={`flex-1 border-b-2 ${active==="A propos" ?" border-b-[#0e8c93] text-black":"text-gray-500 border-b-transparent"}`}>
                <div  className='hover:bg-gray-100 flex-1 p-3 text-center'>
                    <p>A propos</p>
                </div>
            </div>
        </div>

        {active==="Dressing" && 
        <div className='flex flex-col'>
            <div className='flex items-center p-2'>
                <img className='rounded-full w-14 mr-2' src={user.image} alt="user image"/>
                <div className='flex-1'>
                    <p className='text-lg capitalize'>{user.name}</p>
                    <p className='text-gray-600'>Pas encore d'evaluation</p>
                </div>
                <ChevronRightIcon className='w-6 text-gray-500' />
            </div>

            <div className='border-t border-t-gray-200 border-b border-b-gray-200 py-3 px-1'>
                <div className='flex items-center space-x-1 text-gray-600'>
                    <CheckCircleIcon className='w-5 text-gray-400' />
                    <p>Google,Email</p>
                </div>

                <div className='flex items-center space-x-1 text-gray-600'>
                    <LocationMarkerIcon className='w-5 text-gray-400' />
                    <p>Paris,France</p>
                </div>

                <div className='flex items-center space-x-1 text-gray-600'>
                    <WifiIcon className='w-5 text-gray-400 rotate-45' />
                    <p>0 abonnés, 0 abonnements</p>
                </div>
            </div>

            <div className='p-4 text-lg mb-4'>
            {articles.length>0 && 
            <div className='mb-8'>
                <p className='text-center text-xl'>
                    {articles.length} articles
                </p>
            </div>

            }
            {articles.length>0 && <div className=''>
                    <div className='flex flex-wrap justify-center '>
                       

                        {
                            articles.map((article,i) => 
                                (
                                <Article article={article} isLiked={false} isProfile={true} key={i} />   
                                )
                            )
                        }

                    </div>
                </div>
            }

            </div>
        </div>
        }

        {active==="Evaluations" &&
            <div className='flex flex-col items-center mt-10'>
                <StarIcon className='w-16' />
                <p className='text-xl'>Pas encore d'evaluations</p>
                <p className='text-sm text-gray-600'>
                    Ce membre n'a pas encore d'evaluations
                </p>
            </div>

        }
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

export default profil