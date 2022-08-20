import Head from 'next/head'
import Header from '../components/Header';
import Hero from '../components/Hero';
import Actu from '../components/Actu';
import Favorite from '../components/Favorite';
import { getSession, useSession } from 'next-auth/react';
import Modal from '../components/Modal';

const Home = ({user}) => {

  const {data:session} = useSession();

  console.log(user)
  return (
    <div className='w-full'>
      <Head>
        <title>Vinted | Achete vends ou échange</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
      </Head>
      
      <Modal />
      <div className='sticky top-0 z-10'>
        <Header user={user} />
      </div>
      {!user &&
        <Hero />
      }
      {
        session && <Favorite />
      }
      <Actu />
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
      props:{user:null}
    }
  }
  
}

export default Home
