import React from 'react'

function Skeleton() {
  return (
      <div className="shadow p-2 w-screen  lg:w-[95vw] md:w-[90vw] lg:h-[calc(100vh-3.7rem)] h-[calc(100vh-6.2rem)] md:h-[calc(100vh-3.7rem)]">
      <div className="animate-pulse gap-2 flex lg:mt-[12vh] justify-evenly md:justify-center">
            <div className='grid gap-2 grid-rows-4 '>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
            </div>
            <div className='grid gap-2 grid-rows-4'>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
            </div>
            <div className='md:grid gap-2 grid-rows-4 hidden'>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
            </div>
            <div className='lg:grid gap-2 grid-rows-4 hidden'>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
            </div>            
      </div>
    </div>
  )
}

export default Skeleton