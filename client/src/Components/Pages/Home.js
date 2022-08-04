import React, { useEffect} from 'react'
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



function Home() {

  const {followerPost,loading} = useSelector(state =>state.post)
  const {currentUser} = useSelector(state =>state.user)
  const dispatch = useDispatch()

  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get('token')}`
    }
  }


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
      <div className='flex justify-between bg-[#2D3B58]'>
        <div>
          <SideBar/>
        </div>
      {!loading ? <div className='flex flex-col md:p-0  md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll md:border md:border-x-0 md:border-r-2 md:border-[#BED7F8] md:border-t-0 flex-auto mb-2 md:mb-0'>
          {followerPost?.map((p) =>(
            <ExploreMore explore={p} key={p._id} bookmark={currentUser?.bookmarkedPost?.includes(p?._id)?true:false} likes={currentUser?.likedPost?.includes(p?._id)?true:false}/>
          ))}
        </div>:<div className='flex flex-col md:p-0  md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll md:border md:border-x-0 md:border-r-2 md:border-[#BED7F8] md:border-t-0 flex-auto mb-2 md:mb-0'>
          {followerPost?.map((p) =>(
            <PostSkeleton key={p._id} />
          ))}
        </div>}
       
        <div className='hidden md:flex md:w-60 h-[calc(100vh-3.5rem)] overflow-y-scroll lg:w-80 xl:w-96 ml-2 flex-col  mt-3 text-white '>
              <h1>Suggested Followers</h1>
              <div className='mt-3  p-2'>
                    <Suggested name="Leander"/>
                    <Suggested name="Riya"/>
                    <Suggested name="Rejoy"/>
                    <Suggested name="Natasha"/>
              </div>
              {/* <SearchFreindSkeleton/> */}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home