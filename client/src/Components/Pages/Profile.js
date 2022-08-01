import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../Footer'
import Pin from '../GridSystem/Pin'
import Cookie from "js-cookie"  
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import { chatError, chatStart, chatSuccess } from '../../redux/Slice/chatSlice'



function Profile() {
  
  const {click,currentUser} = useSelector(state =>state.user)
  const [loading, setLoading] = useState(false)
  const {userId} = useParams()
  const [follow, setFollow] = useState(false)
  const [user, setUser] = useState()
  const [post, setPost] = useState([])
  const {allChat} = useSelector(state => state.chat)
  const dispatch = useDispatch()
  const current =currentUser.others?currentUser.others:currentUser
  const navigate = useNavigate()

  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get('token')}`
    }
  }

useEffect(() => {
  const getPost = async() =>{
    try {
      const {data} = await axios.get("http://localhost:3001/api/user/"+userId,config)
      setUser(data.user)
      setPost(data.post)
      setFollow(current?.following?.includes(data.user._id))
      setLoading(true)
    } catch (error) {
        console.log(error?.response?.data);
    }
  }
  getPost()
},[userId])

const openChat = async(e) =>{
  e.preventDefault()
  try {
    dispatch(chatStart())
    const {data} = await axios.post("http://localhost:3001/api/chat/"+userId,{},config)
    if(typeof(data) === "string"){
      navigate("/chat")
      return 
    }
    dispatch(chatSuccess([data,...allChat,]))
    navigate("/chat")
} catch (error) {
    dispatch(chatError())
    console.log(error);
}
}

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
      <div className='flex bg-[#2D3B58] '>
        <div className='sidebar'>
          <SideBar/>
        </div>
        <div className='h-[calc(100vh-20rem)] text-white xl:w-[94%]  w-screen'>
            <div className='flex justify-center md:space-x-12 '>
                <div className='left image mt-6 xl:ml-[16rem] mr-2'>
                      <img className='rounded-full p-1 md:p-4 h-12 w-12 md:w-36 md:h-36' alt='profile' src={user?.profile} />
                </div>
                <div className='right flex flex-col'>
                  <div className='top flex space-x-14 md:space-x-[12rem] xl:space-x-[16rem] lg:space-x-[14rem] mt-8 xl:mr-48'>
                        <div>
                              <h1>{user?.username}</h1>
                        </div>
                        {userId !== currentUser?._id &&<div className='h-6 flex items-center'>
                              {/* <h1 className=' rounded-lg p-0.5 text-black bg-[#BED7F8] cursor-pointer active:bg-[#88b8f7] active:rounded-lg' onClick={openChat}>Message</h1> */}
                              {userId !== currentUser?._id && <div>
                              {follow ?<i className="fa-solid fa-user-slash fa-xl ml-2 cursor-pointer" onClick={following}></i>:
                              <i className="fa-solid fa-xl ml-2 fa-user-plus cursor-pointer" onClick={following}></i>}
                              </div>}
                        </div>  } 
                         
                  </div>

                  <div className='mid-up flex space-x-4 md:space-x-10 lg:space-x-14 md:mb-3 mt-4'>
                    <div>
                    <h1>{user?.postCount} post</h1>
                    </div>
                    <div>
                    <h1>{user?.followers.length} followers</h1>
                    </div>
                    <div>
                    <h1>{user?.following.length} following</h1>
                    </div>
                  </div>
                  <div className='mid-bottom bio mt-4 md:m-0 md:space-x-5 flex '>
                  <div >
                      <h1 className='font-bold'>Bio:</h1>
                  </div>
                  <div className='h-28  md:w-80 w-64 break-all pl-2 pr-2'>
                  {user?.bio}
                  </div>

                  </div>

                </div>
            </div>
            {user?._id === currentUser?._id && <div className='mt-24 flex justify-center items-center '>
            <Link to={"/edit/"+userId}><div className='bg-[#BED7F8] text-black w-64 md:w-80 xl:w-[36rem] lg:w-96 rounded-lg flex active:bg-[#85b6f7] justify-center cursor-pointer'>
                 <h1 className='font-bold'>Edit Profile</h1>
              </div></Link>
            </div>}

            <div className={click?'m-0 w-screen xl:w-[86vw] lg:w-[80vw] md:w-[77vw] p-3 md:mt-3 h-[calc(100vh-5rem)] md:h-[calc(100vh-24.8rem)] overflow-y-scroll justify-center absolute grid auto-rows-2fr grid-cols-8':'m-0  w-screen md:w-[93%] p-9 bg-[#2D3B58] md:h-[calc(100vh-24.8rem)] md:mt-3 overflow-y-scroll justify-center md:absolute grid auto-rows-2fr grid-cols-8'}  >
    {post.map((p) =>(
        <Pin url={p.content} id={p._id} key={p._id} size={sizeArray[Math.floor(Math.random() * 3)]}  />
      )
    )}
  </div>
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default Profile