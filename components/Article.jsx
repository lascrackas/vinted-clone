import React, { useState } from 'react';
import { HeartIcon, InformationCircleIcon } from '@heroicons/react/outline';
import {HeartIcon as HeartIconSolid} from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { likeArticle, unlikeArticle } from '../services/articleService';


const Article = ({article,isLiked,isProfile = false}) => {


    const {data:session} = useSession();
    const [liked,setLiked] = useState(isLiked);
    const [likes,setLikes] = useState(article.likes);
    const router = useRouter();

    const handleLikeArticle = async ()=>{
      
        if(!session){
          router.push("/member/signup");
          return;
        }
      
        if(!liked){
          setLikes(likes + 1);
          likeArticle(article.id,session.user.email);

        }else{
          setLikes(likes - 1);
          unlikeArticle(article.id,session.user.email);
          
        }
        
        setLiked(!liked);
    }


  return (
    <div className='basis-52 mb-4 cursor-pointer flex-shrink-0 flex-grow-0 mr-3 '>
      <div className='bg-gray-500'>
        {article.img &&
        <img onClick={()=> router.push(`/article/${article.id}`)}   className='w-full h-72 object-cover' src={article.img[0]} />
        }
      </div>
    <p className='m-0 text-md font-normal flex items-center justify-between'>
         <span className='flex items-center'>{article.price.toFixed(2).replace(".",",")} &euro; <InformationCircleIcon className='h-5 ml-1 text-gray-400' /> </span> 
         {!isProfile &&
          <span className='flex items-center text-xs'>
              {liked ? 
                  <HeartIconSolid  onClick={handleLikeArticle} className='h-4 text-red-500 mr-[2px]'/>:
                  <HeartIcon onClick={handleLikeArticle} className='h-4 hover:scale-125 mr-[2px] transition duration-200 text-gray-600' />
              
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