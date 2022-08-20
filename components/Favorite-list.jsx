import React, { useEffect,useState } from 'react'
import { onSnapshot, getDoc,doc } from "firebase/firestore";
import {db} from '../firebase';
import Article from './Article';
import { useSession } from 'next-auth/react';

const FavoriteList = ({user}) => {


    const [favorites, setFavorites] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            return onSnapshot(doc(db,"users",user.email), async (user)=>{
                const likedArticlesRefs = user.data().likedArticles;
                const articles = [];
                await Promise.all(
                    likedArticlesRefs.map((articleId)=> {
                        return getDoc(doc(db,'articles',articleId)).then((article)=> {
                            articles.push({...article.data(),id:article.id})
                        })
                    })
                )
                setFavorites(articles);
            })
        }
        fetchData();
    },[user])

 

  return (
    <>
    {favorites.length>0 && <div className='w-[90%] mx-auto my-10'>
        <div className='flex items-center justify-between my-4'>
        <h1 className='text-3xl'> Articles Favoris</h1>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>

            {
                favorites.map((favorite,i) => 
                    (
                        <div key={i} className="flex flex-col flex-shrink-0 flex-grow-0">
                            <div className='flex items-center justify-start cursor-pointer mb-2'>
                                <img className='w-8 rounded-full mr-2' src={favorite.sellerImg} alt="seller image" />
                                <p className='text-sm capitalize'>{favorite.sellerUsername}</p>
                            </div>
                            <Article article={favorite} isLiked={true}  />   
                        </div>
                    )
                )
            }
        </div>
    </div>
}
</>
  )
}

export default FavoriteList;