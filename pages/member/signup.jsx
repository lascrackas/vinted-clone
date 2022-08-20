import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Signup from '../../components/Signup';
import Modal from '../../components/Modal';
const signup = () => {
  return (
    <>
     <Head>
        <title>Vinted | Achete vends ou échange</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
      </Head>
    <Modal />
    <div className='sticky top-0 border-b border-b-gray-200'>
    <div className='w-full header-breakpoint:w-4/5 mx-auto'>
      <Header />
    </div>
    </div>
    <Signup />
    </>
  )
}

export default signup