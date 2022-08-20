import React from 'react'
import {signIn} from 'next-auth/react';
import { useState } from 'react';


const Signup = () => {

    const [signin, setSignin] = useState(true);

  return (
    <>
        {signin &&
            
            <div className='pt-5'>
            <div className='mx-2 border border-gray-300 md:w-[400px] mt-6 py-4 md:mx-auto rounded-md flex flex-col items-center justify-center'> 
                <h1 className='text-2xl'>Bienvenue !</h1> 
                <button disabled className='border disabled:opacity-50  border-gray-200 p-2 my-3 text-base flex items-center justify-center w-[calc(100%-2rem)] mx-auto rounded-md' ><img className='w-5 mr-2' src="/img/logofacebook.svg" />  Continuer avec Facebook</button>
                <button onClick={()=> signIn("google",{callbackUrl:"/"})} className='border border-gray-200 p-2 my-3 flex items-center justify-center  w-[calc(100%-2rem)] mx-auto rounded-md'><img className='w-5 mr-2' src="/img/logogoogle.png" />  Continuer avec Google</button>
                <button disabled className='border disabled:opacity-50 border-gray-200 p-2 my-3  flex items-center justify-center w-[calc(100%-2rem)] mx-auto rounded-md'><img className='w-5 mr-2' src="/img/apple.png" />  Continuer avec Apple</button>
                <p className='mb-4'>Tu n'as pas de compte vinted? <span  onClick={() => setSignin(false) }  className='text-[#0e8c93] cursor-pointer'>S'inscrire</span></p>
            </div>
        </div>
        }
        {!signin &&
             <div className='pt-5'>
             <div className='mx-2 border border-gray-300 md:w-[400px] mt-6 py-4 md:mx-auto rounded-md flex flex-col items-center justify-center'> 
                 <h1 className='text-2xl px-7 text-center'>Rejoins le mouvement de la seconde main et vends sans frais !</h1> 
                 <button disabled className='border disabled:opacity-50 border-gray-200 p-2 my-3 text-base flex items-center justify-center w-[calc(100%-2rem)] mx-auto rounded-md' ><img className='w-5 mr-2' src="/img/logofacebook.svg" />  Continuer avec Facebook</button>
                 <button onClick={()=> signIn("google",{callbackUrl:"/"})} className='border border-gray-200 p-2 my-3 flex items-center justify-center  w-[calc(100%-2rem)] mx-auto rounded-md'><img className='w-5 mr-2' src="/img/logogoogle.png" />  Continuer avec Google</button>
                 <button disabled className='border disabled:opacity-50 border-gray-200 p-2 my-3  flex items-center justify-center w-[calc(100%-2rem)] mx-auto rounded-md'><img className='w-5 mr-2' src="/img/apple.png" />  Continuer avec Apple</button>
                 <p className='mb-4'>Tu as deja un compte? <span onClick={() => setSignin(true) } className='text-[#0e8c93] cursor-pointer'>Se connecter</span></p>
             </div>
         </div>
            
        }
    </>
  )
}

export default Signup