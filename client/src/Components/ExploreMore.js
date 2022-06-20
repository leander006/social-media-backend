import React, { useState } from 'react'
import Comments from './Comments'

function ExploreMore({name,profile,content,liked,message,caption,count,likecount,likename,time}) {
      const [likes, setLikes] = useState(false)

      const handleLikes =(e) =>{
            e.preventDefault()
            setLikes(!likes)
      }

  return (


    <div className='flex p-4 flex-col w-screen md:w-96 lg:w-11/12 lg:p-6' >
          <div className='flex'>
                <img src={profile} alt='image' className='w-10 h-10 rounded-full mr-3 border border-purple-400 '/>
                  <h1 className='capitalize mt-1 font-sans text-slate-700'>{name}</h1>
          </div>
          <div className='p-2 flex justify-center '>
          <img src={content} className='rounded-lg md:w-full  object-contain ' alt='image'/>
          </div>
          <div className='flex pl-3 pb-2'>
                <div className='likes cursor-pointer' onClick={handleLikes}>
                {!likes ? <i className="fa-regular fa-heart fa-2xl pr-3"/>:
                  <i className="fa-solid fa-heart fa-2xl pr-3 text-red-700"/>}
                </div>
          <i className="fa-solid fa-comments fa-2xl pt-3 cursor-pointer"/>
          </div>
         {likename && <h1 className='pl-3 text-purple-600'>Liked by {likename} {likecount && " and "+ likecount+" others"}</h1>}
          <h1 className='capitalize ml-3 mt-2'>{caption}</h1>
          <div className='px-4 pt-1'>
                <h1 className='text-gray-400 cursor-pointer' >View all {count} Comments</h1>                
          </div>
    </div>
  )
}

export default ExploreMore