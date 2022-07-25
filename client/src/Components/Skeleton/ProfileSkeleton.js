import React from 'react'
import Skeleton from './Skeleton'

function ProfileSkeleton() {
  return (
      <div className='h-[calc(100vh-20rem)] animate-pulse bg-[#2D3B58]  text-white xl:w-[94%]  w-screen'>
      <div className='flex justify-center md:space-x-12 '>
          <div className='left image mt-6 xl:ml-[16rem] '>
                <div className='rounded-full bg-slate-200 p-1 md:p-4 h-full w-28 md:w-36 '></div>
          </div>
          <div className='right flex flex-col'>
            <div className='top flex mt-8 xl:mr-48'>
                  <div className='w-6 h-2 bg-slate-200'>
                  </div>
                  <div className='h-6 flex items-center rounded-lg p-0.5'>
                        <div className='w-5 h-4 bg-slate-100'></div>  
                  </div>    
            </div>

            <div className='mid-up flex space-x-4 md:space-x-10 lg:space-x-14 md:mb-3 mt-4'>
            <div className='w-6 h-2 bg-slate-200'></div>
            <div className='w-6 h-2 bg-slate-200'></div>
            <div className='w-6 h-2 bg-slate-200'></div>
            </div>
            <div className='mid-bottom bio mt-4 md:m-0 md:space-x-5 flex '>
            <div className='w-6 h-2 bg-slate-200'></div>
            <div className='w-6 h-8 bg-slate-200'></div>

            </div>

          </div>
      </div>
      <div className='mt-24 flex justify-center items-center '>
      <div className='w-6 h-2 bg-slate-200'></div>
          <i className="fa-solid fa-xl ml-2 fa-user-plus cursor-pointer"></i>
      </div>

      <Skeleton/>

  </div>
  )
}

export default ProfileSkeleton