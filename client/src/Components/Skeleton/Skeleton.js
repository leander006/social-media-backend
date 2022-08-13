import React from 'react'

function Skeleton() {
  return (
      <div className="shadow p-2 w-screen lg:w-[95vw] md:w-[90vw] lg:h-[calc(100vh-3.7rem)] h-[calc(100vh-6.2rem)] md:h-[calc(100vh-3.7rem)]">
      <div className="animate-pulse gap-2 flex lg:mt-[12vh] justify-evenly md:justify-center">
            <div className='grid grid-cols-3 grid-rows-3 gap-2'>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
                  <div className='h-32 w-32 bg-slate-100'></div>
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