import React, { useEffect,useState } from 'react'
import Article from './Article';
import {fetchArticles} from '../services/articleService';

const Actu = ({user}) => {


    const [actus, setActus] = useState([]);


   

    useEffect(()=> {
        const fetchData = async ()=> {
            const articles = await fetchArticles();
            setActus(articles);
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
                actus.map((actu,i)=> 
                    (
                        <Article article={actu} isLiked={actu.likers?.includes("mouradaliouachene86@gmail.com")} key={i} />
                    )
                )
            }


        </div>
    </div>
  )
}

export default Actu