import React from 'react';
import Header from '../../../components/Header';
import Favorite from '../../../components/Favorite-list';
import { getSession } from 'next-auth/react';

const favourite= ({user}) => {
  return (
    <>
        <div className='sticky top-0 z-10'>
         <Header user={user}  />
        </div>
        <Favorite user={user} />
    </>
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

export default favourite