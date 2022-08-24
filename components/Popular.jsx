import React, { useEffect,useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../firebase';
import Article from './Article';
import { useSession } from 'next-auth/react';

const Popular = () => {


    const [populars, setPopulars] = useState([]);
    const {data:session} = useSession();

    useEffect(()=> {
        const fetchData = async () => {

            const q = query(collection(db, "articles"),where("likes",">=",4));
            const querySnapshot = await getDocs(q);
            setPopulars(querySnapshot.docs.map((doc)=>{return {...doc.data(),id:doc.id}}))
        }
        fetchData();
    },[])

 

  return (
    <div className='w-[90%] mx-auto my-10'>
        <div className='flex items-center justify-between my-4'>
        <h1 className='text-3xl'> Articles Populaires</h1>
        <span className='text-[#0e8c93] cursor-pointer'>Voir tout</span>
        </div>
        <div className='flex overflow-x-auto'>

            {
                populars.map((popular,i) => 
                    (
                       <Article article={popular} isLiked={false} key={i} />   
                    )
                )
            }

            <div className=' flex cursor-pointer items-center p-4 justify-center flex-grow-0 flex-shrink-0 text-gray-500 bg-gray-200'>

                    <p>
                    
                        Voir tout les articles
                    </p>


            </div>

        </div>
    </div>
  )
}

export default Popular