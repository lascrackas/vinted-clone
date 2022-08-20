import React, { useEffect,useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../firebase';
import Article from './Article';
import { useSession } from 'next-auth/react';

const Actu = () => {


    const [actus, setActus] = useState([]);
    const {data:session} = useSession();

    useEffect(()=> {
        const fetchData = async () => {

            const q = query(collection(db, "articles"));
            const querySnapshot = await getDocs(q);
            querySnapshot.docs.forEach((doc)=>console.log(doc.data()))
            setActus(querySnapshot.docs.map((doc)=>{return {...doc.data(),id:doc.id}}))
        }
        fetchData();
    },[])

 

  return (
    <div className='w-[90%] mx-auto my-10'>
        <div className='flex items-center justify-between my-4'>
        <h1 className='text-3xl'> Fil d'actus</h1>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>

            {
                actus.map((actu,i) => 
                    (
                       <Article article={actu} isLiked={false} key={i} />   
                    )
                )
            }


        </div>
    </div>
  )
}

export default Actu