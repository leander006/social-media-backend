import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExploreAll from '../ExploreAll'
import Cookie from "js-cookie"
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import PostSkeleton from '../Skeleton/PostSkeleton'


function LikedPost() {

  const [loading, setLoading] = useState(false)
  const [likePost, setLikePost] = useState([])

  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get('token')}`
    }
  }

  useEffect(() => {
    const getPost = async() =>{
      try {
          setLoading(true)
          const {data} = await axios.get("http://localhost:3001/api/post/liked/Post",config)
          setLoading(false)
          setLikePost(data)
      } catch (error) {
          console.log(error?.response?.data);
      }
    }
    getPost()
    
  },[] )

  return (
    <>
    <Navbar/>
    <div className='flex justify-between bg-[#2D3B58]'>
        <div className='sidebar'>
          <SideBar/>
        </div>
      {likePost?<div className='likepart mb-6'>
       {!loading ?<div className='flex flex-col md:p-0  md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll lg:border lg:border-x-0 lg:border-r-2 lg:border-[#BED7F8] lg:border-t-0 flex-auto '>
       <div className='mx-auto my-1 font-bold text-xl text-[#547bca]' >Liked Post</div>
            {likePost?.map((l) =>(
              <ExploreAll key={l._id} exploreAll={l}/>
            ))}
        </div>:<div className='flex flex-col md:p-0  md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll md:border md:border-x-0 md:border-r-2 md:border-[#BED7F8] md:border-t-0 flex-auto mb-2 md:mb-0'>
            {likePost?.map((l) =>(
              <PostSkeleton key={l._id}/>
            ))}
        </div>}
      </div>:<div className='h-[calc(100vh-4.3rem)] flex items-center m-auto font-bold text-3xl md:h-[calc(100vh-2.7rem)] text-[#547bca]' >No post liked yet</div>}
    </div>
    <Footer/>    
    </>
  )
}

export default LikedPost