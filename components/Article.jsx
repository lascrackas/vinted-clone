import React, { useState } from 'react';
import { HeartIcon, InformationCircleIcon } from '@heroicons/react/outline';
import {HeartIcon as HeartIconSolid} from '@heroicons/react/solid';
import { doc, updateDoc,collection,addDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import {db} from '../firebase';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


const Article = ({article,isLiked,isProfile = false}) => {


    const {data:session} = useSession();
    const [liked,setLiked] = useState(isLiked);
    const [likes,setLikes] = useState(article.likes);
    const router = useRouter();

    const likeArticle = async ()=>{
      
      const docRef = doc(db, "articles", article.id);
      const userRef = doc(db,"users",session.user.email);
        if(!liked){
          setLikes(likes + 1);
          updateDoc(docRef, {
            likes:likes+1,
            likers:arrayUnion(session.user.email)
          })
          setDoc(userRef,{
            likedArticles:arrayUnion(article.id)
          },{merge:true});

        }else{
          setLikes(likes - 1);
          updateDoc(docRef, {
            likes:likes-1,
            likers:arrayRemove(session.user.email)
          });
          updateDoc(userRef,{
            likedArticles:arrayRemove(article.id)
          })
        }
        
        setLiked(!liked);
    }


  return (
    <div onClick={()=> router.push(`/article/${article.id}`)} className='basis-52 mb-4 cursor-pointer flex-shrink-0 flex-grow-0 mr-3'>
    <img  className='w-full h-72 object-cover' src={article.img[0]} />
    <p className='m-0 text-md font-normal flex items-center justify-between'>
         <span className='flex items-center'>{article.price.toFixed(2).replace(".",",")} &euro; <InformationCircleIcon className='h-5 ml-1 text-gray-400' /> </span> 
         {!isProfile &&
          <span className='flex items-center text-xs'>
              {liked ? 
                  <HeartIconSolid  onClick={likeArticle} className='h-4 text-red-500 mr-[2px]'/>:
                  <HeartIcon onClick={likeArticle} className='h-4 hover:scale-125 mr-[2px] transition duration-200 text-gray-600' />
              
              }
              <span className='text-sm'>
                {likes}
              </span>
          </span>
         }
    </p>
    {!isProfile &&
      <>
        <p className='m-0 text-sm text-gray-400 uppercase'>{article.size}</p>
        <p className='m-0 text-sm text-gray-400 capitalize'>{article.brand}</p>
      </>

    }
</div>
  )
}

export default Article