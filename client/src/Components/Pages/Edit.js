import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout } from '../../redux/Slice/userSlice'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import Cookie from "js-cookie"
import axios from 'axios'

function Edit() {
      const navigate = useNavigate()
      const dispatch = useDispatch();
      const {currentUser} = useSelector(state=>state.user)
      const [name, setName] = useState("")
      const [username, setUsername] = useState("")
      const [bio, setBio] = useState("")
      const [profile, setProfile] = useState()
      const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${Cookie.get("token")}`
            }
          }
      const ok = async(e) =>{
            e.preventDefault()
            // try {
            //       dispatch(loginStart())
            //       const {data} = await axios.put("http://localhost:3001/api/user/update",
            //       {username:username, bio:bio, name:name,profile:profile}
            //       ,config); 
            //       dispatch(loginSuccess())
            //       navigate("/profile")
            // } catch (error) {
            //       dispatch(loginError())
            //       console.log(error?.response?.data);
            // }
            navigate("/profile")
      }

      const cancel = () =>{
            navigate("/profile")
      }
      const log = (e)=>{
            e.preventDefault();
            dispatch(logout())
            navigate("/")
      }

  return (
      <>
      <Navbar/>
        <div className='flex bg-[#2D3B58]'>
          <div>
            <SideBar/>
          </div>
          <div className='flex flex-col md:m-auto w-screen h-[calc(100vh-4.3rem)] md:pt-16 lg:w-[60%] md:w-[75%] md:h-[calc(100vh-2.7rem)] overflow-y-scroll'>
                  <div className='flex justify-between p-4 '>
                        <div className='flex items-center space-x-5'>
                              <i className="fa-solid fa-2xl fa-xmark cursor-pointer text-[#8aaaeb]" onClick={cancel}></i>
                              <h1 className='font-bold text-xl'>Edit profile</h1>
                        </div>
                        <div>
                              <i className="fa-solid fa-2xl cursor-pointer fa-check text-[#8aaaeb]" onClick={ok}></i>
                        </div>
                  </div>

                  <div className='flex flex-col justify-center items-center' >
                        <img className='image w-16 h-16 rounded-full ' src='/images/noProfile.jpeg' alt='image'/>
                        <label className='text-[#8aaaeb] cursor-pointer hover:text-[#6795f1]' htmlFor='forFile'>Change Profile</label>
                        <input type="file" id='forFile' accept='image/png , image/jpg, image/jpeg' style={{display:"none"}} onChange={e=>setProfile(e.target.files[0])}  name="file" required />
                  </div>

                  <div className='bottom'>
                        <div className='p-2'>
                              <h1 className='text-[#8aaaeb] '>Name</h1>
                              <input className='bg-[#2D3B58] border-b w-full mt-2 outline-none' value={name} onChange={e=>setName(e.target.value)}  type="text"></input>
                        </div>

                        <div className='p-2'>
                              <h1 className='text-[#8aaaeb] '>Username</h1>
                              <input className='bg-[#2D3B58] border-b w-full mt-2 outline-none' value={username} onChange={e=>setUsername(e.target.value)}  type="text"></input>
                        </div>

                        <div className='p-2'>
                              <h1 className='text-[#8aaaeb] '>Bio</h1>
                              <textarea className='bg-[#2D3B58] border-b w-full mt-2 outline-none' value={bio} onChange={e=>setBio(e.target.value)}  type="text"></textarea>
                        </div>

                  </div> 
                  <div className='flex text-lg font-bold ml-2 mt-2 text-[#8aaaeb]'>
                         <h1 className='cursor-pointer' onClick={log}>Switch account</h1>
                  </div>
                
          </div>
        </div>
        <Footer/>
      </>
  )
}

export default Edit