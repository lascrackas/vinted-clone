import React, { useEffect,useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase';
import Article from './Article';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Favorite = () => {


    const [favorites, setFavorites] = useState([]);
    const {data:session} = useSession();
    const router = useRouter();

    useEffect(()=> {
        const fetchData = async () => {
            const user = await getDoc(doc(db,"users",session.user.email));
            if(user.exists()){
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
            }
        }
        fetchData();
    },[session])

 

  return (
    <>
    {favorites.length>0 && <div className='w-[90%] mx-auto my-10'>
        <div className='flex items-center justify-between my-4'>
        <h1 className='text-3xl'> Articles Favoris</h1>
        <span onClick={()=> router.push("/member/items/favourite_list")} className='text-[#0e8c93] cursor-pointer'>Voir tout</span>
        </div>
        <div className=''>

            <div className='flex overflow-x-auto scrollbar-hide'>

                {
                    favorites.map((favorite,i) => 
                        (
                        <Article article={favorite} isLiked={true} key={i} />   
                        )
                    )
                }

                <div onClick={()=> router.push("/member/items/favourite_list")}  className=' flex cursor-pointer items-center p-4 justify-center flex-grow-0 flex-shrink-0 text-gray-500 bg-gray-200'>

                        <p>
                        
                            Voir tout les articles
                        </p>


                </div>

            </div>
        </div>
    </div>
}
</>
  )
}

export default Favorite;