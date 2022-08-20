import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center mb-3 p-2'>
        <div className='h-12 w-12 mr-2 bg-stone-100 rounded-full'></div>
        <div>
            <div className='w-32 h-4 bg-stone-100 rounded-md mb-2'></div>
            <div className='w-20 h-4 bg-stone-100 rounded-md'></div>
        </div>
    </div>
  )
}

export default Loader