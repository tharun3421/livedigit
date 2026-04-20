import React from 'react'

const Purpose = () => {
  return (
    <div className='h-screen w-full flex flex-col p-8  '>
        <div className='bg-black text-white px-7 pt-4 rounded-3xl h-[90vh]'>
            <div className='h-[40vh] border-b'>
            <h1 className='text-6xl font-medium mb-8'>Our Mission</h1>
            <div className='w-[60vw]'>
                <p className='text-2xl leading-snug'>To empower businesses with cutting-edge digital products that drive growth and meaningful impact. We strive for engineering excellence and user-centric innovation in every pixel we craft.</p>
            </div>
        </div>
        <div className='flex flex-col items-end justify-start h-[50vh] mt-6'>
            <h1 className='text-6xl font-medium mb-8 '>Our Vision</h1>
            <div className='w-[60vw] '>
                <p className='text-2xl leading-snug'>To be the global benchmark for digital transformation, setting new standards in technology and design. We envision a future where technology is intuitively woven into success for every client we serve.</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Purpose