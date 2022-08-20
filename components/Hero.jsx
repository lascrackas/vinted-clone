import React from 'react'

const Hero = () => {
  return (
    <div className='relative'>
        <div className='flex flex-col md:relative '>
            <img className='w-full object-cover h-[400px]' src='/img/hero.jpg' />
            <div className='md:w-[350px] md:h-[300px] px-10 rounded-sm ml-8 text-center  md:absolute md:top-12 md:left-5 bg-white'>
                <h1 className='text-2xl md:font-medium  md:text-4xl pt-6 pb-2'>Pret a faire du tri dans vos placard ? </h1>
                
                <p>
                    <button className='bg-[#0e8c93] w-full m-0 p-3 text-white rounded-md'>Vends maintenant</button>
                </p>
                <p className='text-[#0e8c93]  mt-2'>
                    Decouvrir comment ca marche
                </p>
                
            </div>
        </div>
    </div>
  )
}

export default Hero