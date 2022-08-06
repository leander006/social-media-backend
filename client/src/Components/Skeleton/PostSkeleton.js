import React from 'react'

function PostSkeleton() {
  return (
      <div className='flex animate-pulse border flex-col w-screen shadow lg:w-[65%] xl:w-[49%] bg-[#455175] md:mt-4 my-3' >
      <div className='flex p-1 items-center' >
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
           <div className="h-2 bg-slate-200 rounded"></div>
      </div>
      <div className='flex justify-center'>
      <div className= 'w-full h-56 bg-slate-50 lg:w-[100vw]'></div>
      </div>
      <div className='flex my-3 mx-3 items-center justify-between' >
            <div className='flex likes cursor-pointer items-center'>
                          <i className="fa-solid text-slate-50 fa-heart fa-2xl pr-3"/>
                          <i className="fa-solid text-slate-50 fa-2xl fa-comment" ></i>                        
            </div>
             <div>
                    <i className="fa-solid fa-xl text-slate-50 fa-bookmark "></i>
            </div>             
            
      </div>
   
</div>
  )
}

export default PostSkeleton