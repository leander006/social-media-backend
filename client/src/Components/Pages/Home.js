import React, { useEffect, useState} from 'react'
import ExploreMore from '../ExploreMore'
import Navbar from '../Navbar'
import Suggested from '../Suggested'
import SearchFreindSkeleton from '../Skeleton/SearchFreindSkeleton'
import PostSkeleton from '../Skeleton/PostSkeleton'
import Cookie from "js-cookie"  
import { useDispatch, useSelector } from 'react-redux'
import { followerPostError, followerPostStart, followerPostSuccess } from '../../redux/Slice/postSlice'
import axios from 'axios'
import SearchFreind from '../SearchFreind'



function Home() {

  const {followerPost,loading} = useSelector(state =>state.post)
  const [search, setSearch] = useState([])
  const [sloading, setSloading] = useState(false)
  
  const dispatch = useDispatch()

  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get('token')}`
    }
  }

useEffect(() => {
    const getUser = async() =>{
          try {
                setSloading(true);
                const {data}= await axios.get("http://localhost:3001/api/user/suggesteduser/user",config)
                setSearch(data);
                setSloading(false)
          } catch (error) {
                console.log(error);
          }
    }
    getUser();
}, [])

  useEffect(() => {
    const getFollowersPost = async() =>{
      try {
        dispatch(followerPostStart())
        const {data} = await axios.get("http://localhost:3001/api/post/following/Post",config)
        dispatch(followerPostSuccess(data))
        
      } catch (error) {
          dispatch(followerPostError())
           console.log(error?.response?.data);
      }
    }
    getFollowersPost()
  },[] )

 

  return (
    <>
    <Navbar/>
      <div className='flex bg-[#2D3B58] z-50 mt-10 '>
       {followerPost?.length !==0?<div className='main md:flex mx-auto lg:basis-[70%] md:basis-[60%] '>
            {!loading ?<div className='flex flex-col lg:pl-[17rem] md:pr-5 md:pt-2 md:pb-10 h-[calc(100vh-2.7rem)] overflow-y-scroll  '>
                {followerPost?.map((p) =>(
                  <ExploreMore explore={p} key={p._id}/>
                ))}
                </div>:<div className='flex flex-col md:p-0 md:items-center h-[calc(100vh-2.3rem)] overflow-y-scroll lg:border md:border-x-0 lg:border-r-2 lg:border-[#BED7F8] md:border-t-0 flex-auto mb-2 md:mb-0'>
                {followerPost?.map((p) =>(
                  <PostSkeleton key={p._id} />
                ))}
                </div>}
        </div>:<div className=' lg:basis-[70%] justify-center flex items-center lg:items-start lg:pt-36 m-auto font-bold md:text-3xl h-[calc(100vh-2.7rem)] text-[#547bca]' >No Post!Please Follow Someone</div>}

        <div className='hidden lg:flex basis-[30%] lg:mr-[10rem] lg:ml-[2rem] md:w-60 h-[calc(100vh-3.5rem)] overflow-y-scroll lg:w-80 xl:w-96 ml-2 flex-col  mt-3 text-white '>
              <h1>Suggested Followers</h1>
             {!sloading ? <div>
              {search.map((s) =>(
                <SearchFreind search={s} key={s._id}/>
              ))}
              </div>:<SearchFreindSkeleton/>}
        </div>
      </div>
    </>
  )
}

export default Home