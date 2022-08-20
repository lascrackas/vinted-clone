import React from 'react'
import Header from '../../components/Header';
import { PaperAirplaneIcon, PencilAltIcon,ChevronDownIcon } from '@heroicons/react/outline';
import { useSession,getSession } from 'next-auth/react';
import Loader from '../../components/Loader';

const inbox = ({user}) => {

    const {data:session} = useSession();

  return (
    <div className='h-screen flex flex-col'>
        <div className='sticky top-0'>
            <Header user={user} />
        </div>
        <div className='flex-1  bg-white pt-2'>
            <div className='header-breakpoint:w-[70%] header-breakpoint:ml-[5%] h-full header-breakpoint:p-3 rounded-md'>    
                <div className='grid header-breakpoint:grid-cols-3 h-full  bg-white'>
                    <div className='w-full col-span-3 border border-gray-200 header-breakpoint:border-r-0 rounded-l header-breakpoint:col-span-1'>
                        <div className=' flex items-center justify-between p-2 border-b border-b-gray-200'>
                            <div  className='flex items-center space-x-1'>
                                <span className='text-sm font-semibold'>
                                    Messages
                                </span>
                            </div>
                            <div>
                                <PencilAltIcon className='w-6 text-[#0e8c93]'  />
                            </div>
                        </div>
                        <div className='mt-8'>
                            <p className='text-center text-2xl'>(No messages)</p>
                        </div>
                    </div>
                    <div className='hidden header-breakpoint:inline w-full  border border-gray-200 rounded-r  col-span-2'>
                      
                    </div>
                </div>
            </div>
        </div>
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
            redirect: {
              destination: '/',
              permanent: false,
            },
          }
    }
    
  }

export default inbox