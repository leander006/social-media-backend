import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Footer from '../Footer'
import Pin from '../GridSystem/Pin'
import Cookie from "js-cookie"  
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import ExploreMore from '../ExploreMore'
import { SpinnerCircular } from 'spinners-react';




function Profile() {
  
  const {click,currentUser} = useSelector(state =>state.user)
  const [loading, setLoading] = useState(false)
  const {userId} = useParams()
  const [follow, setFollow] = useState(false)
  const [user, setUser] = useState()
  const [post, setPost] = useState([])
  const current =currentUser.others?currentUser.others:currentUser


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
      const {data} = await axios.get("http://localhost:3001/api/user/"+userId,config)
      setUser(data.user)
      setPost(data.post)
      setFollow(current?.following?.includes(data.user._id))
      setLoading(false)
    } catch (error) {
        console.log(error?.response?.data);
    }
  }
  getPost()
},[userId])


const following = async(e) =>{
  e.preventDefault()
  try {
        const {data}= await axios.put(`http://localhost:3001/api/user/addFollower/${userId}`,{},config)
        setFollow(!follow)
  } catch (error) {
        console.log(error?.response?.data);
  }
}
  const sizeArray = ["sm", "md", "lg"];
  return (
    <>
    <Navbar/>
      <div className='flex bg-[#2D3B58]'>
        <div className='sidebar'>
          <SideBar/>
        </div>
        {!loading ?<div className='bg-[#2D3B58] w-full flex flex-col h-[calc(100vh-3rem)]'>
        <div className={click?'flex w-screen flex-col text-white pt-6 lg:w-[80vw] xl:w-[86vw] ':'flex flex-col w-screen bg-[#2D3B58]  md:px-16 pt-6  text-white lg:w-[95vw] '}  >
          <div className='flex lg:mx-36'>
                <div className='p-1 pl-2  md:px-8 flex flex-col items-center'>
                      <img className='rounded-full p-1 w-24 md:w-36 lg:w-48' alt='profile' src={user?.profile} />
                      <h1 className='name'>{user?.username}</h1>
                      {userId !== currentUser?._id &&<div className='h-6 flex mt-3 items-center'>
                              {userId !== currentUser?._id && <div>
                              {follow ?<i className="fa-solid fa-user-slash fa-xl  cursor-pointer" onClick={following}></i>:
                              <i className="fa-solid fa-xl  fa-user-plus cursor-pointer" onClick={following}></i>}
                              </div>}
              </div>  } 
                </div>
                <div className='flex flex-col pt-2 pr-2 md:px-8 w-full'>
                    <div className='flex justify-between w-full '>
                        <h1>{user?.postCount} post</h1>
                        <h1>{user?.followers.length} followers</h1>
                        <h1>{user?.following.length} following</h1>
                    </div>
                    <div className='p-2 mt-6 '>
                        {user?.bio}
                    </div>
                </div>
          </div>
           <div className='px-3 flex justify-between pt-2 lg:mx-16'>
           {user?._id === currentUser?._id && 
            <Link to={"/edit/"+userId}><div className={click?'bg-[#BED7F8] text-black lg:ml-12 md:w-[80vw] lg:w-[60vw] w-[75vw] items-center rounded-lg active:bg-[#85b6f7] cursor-pointer':'bg-[#BED7F8] text-black lg:w-[60vw] xl:ml-28 md:w-[80vw] lg:ml-12 w-[90vw] items-center rounded-lg active:bg-[#85b6f7] cursor-pointer'}>
                 <h1 className='font-bold text-center'>Edit Profile</h1>
              </div></Link>}  
              
          </div>

        </div>
        {user?.postCount !== 0 ?<div className='md:px-24 bg-[#2D3B58] overflow-y-scroll'>
        <div className={click?'m-0  w-screen xl:w-[76vw] md:grid lg:w-[60vw] p-3 md:mt-3 h-[calc(100vh-5rem)] md:h-[calc(100vh-28.8rem)] overflow-y-scroll justify-center absolute hidden auto-rows-2fr grid-cols-8':'m-0 w-[50vw]  md:w-[80vw] p-9 bg-[#2D3B58] md:h-[calc(100vh-18.8rem)]  overflow-y-scroll justify-center md:grid md:absolute hidden auto-rows-2fr grid-cols-8'}  >
                  {post.map((p) =>(
                      <Pin url={p.content} id={p._id} key={p._id} size={sizeArray[Math.floor(Math.random() * 3)]}  />
                    ))}
        </div>
          <div className='md:hidden'>
                  {post.map((p) =>(
                         <ExploreMore explore={p} key={p._id} bookmark={currentUser?.bookmarkedPost?.includes(p?._id)?true:false} likes= {currentUser?.likedPost?.includes(p?._id)?true:false}/>
                  ))}
          </div>
          </div>:<div className='h-[calc(100vh-4.3rem)] flex mt-28 m-auto font-bold text-3xl md:h-[calc(100vh-2.7rem)] text-[#547bca]' >No Post Available </div>}

        </div>:<SpinnerCircular size="90" className='bg-[#2D3B58] w-full flex items-center flex-col h-[calc(100vh-3rem)] mx-auto' thickness='100'  speed="600" color='white' secondaryColor="black"/>}
 
        </div>
      <Footer/>
    </>
  )
}

export default Profile