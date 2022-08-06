import React, { useEffect, useState} from 'react'
import ExploreMore from '../ExploreMore'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
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
  const {currentUser} = useSelector(state =>state.user)
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
      <div className='flex  bg-[#2D3B58]'>
        <div className='sidebar'>
          <SideBar/>
        </div>
       {followerPost.length !== 0 ?<div className='main'>
            {!loading ?<div className='flex flex-col md:p-0 md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll lg:border lg:border-x-0 lg:border-r-2 lg:border-[#BED7F8] lg:border-t-0 flex-auto md:mb-0'>
                {followerPost?.map((p) =>(
                  <ExploreMore explore={p} key={p._id} bookmark={currentUser?.bookmarkedPost?.includes(p?._id)?true:false} likes=     {currentUser?.likedPost?.includes(p?._id)?true:false}/>
                ))}
                </div>:<div className='flex flex-col md:p-0 md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll lg:border md:border-x-0 lg:border-r-2 lg:border-[#BED7F8] md:border-t-0 flex-auto mb-2 md:mb-0'>
                {followerPost?.map((p) =>(
                  <PostSkeleton key={p._id} />
                ))}
                </div>}
        </div>:<div className='h-[calc(100vh-4.3rem)] lg:border w-[70%] justify-center border-y-0 border-l-0 flex items-center m-auto font-bold text-3xl md:h-[calc(100vh-2.7rem)] text-[#547bca]' >No Post! Please Follow Someone</div>}

        <div className='hidden lg:flex basis-1/4 md:w-60 h-[calc(100vh-3.5rem)] overflow-y-scroll lg:w-80 xl:w-96 ml-2 flex-col  mt-3 text-white '>
              <h1>Suggested Followers</h1>
             {!sloading ? <div>
              {search.map((s) =>(
                <SearchFreind search={s} key={s._id}/>
              ))}
              </div>:<SearchFreindSkeleton/>}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home