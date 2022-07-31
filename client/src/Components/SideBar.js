import { current } from '@reduxjs/toolkit';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clicked, logout,unClicked } from '../redux/Slice/userSlice';

function SideBar() {
      const [visible, setVisible] = useState(true);
      const navigate = useNavigate()
      const dispatch = useDispatch();
      const {currentUser} = useSelector(state =>state.user)
      const current =currentUser.others?currentUser.others:currentUser

      const handleVisibility = (e) =>{
            e.preventDefault();
            dispatch(clicked())
            setVisible(!visible);
      }
      const handleUnVisibility = (e) =>{
            e.preventDefault();
            dispatch(unClicked())
            setVisible(!visible);
      }
      const explore= (e) =>{
            e.preventDefault();
            dispatch(unClicked())
            setVisible(!visible);
            navigate("/explore")
      }
      const log = (e)=>{
            e.preventDefault();
            dispatch(logout())
            navigate("/")
      }
  return (
        <>
      <div className={visible?'hidden md:flex flex-1 bg-[#BED7F8] h-[calc(100vh-2.7rem)] z-10 w-12':'hidden md:flex bg-[#BED7F8] flex-col h-[calc(100vh-2.7rem)] z-10 w-44' }> 
            <div>
                  {visible && <h1><i className="fa-solid fa-xl fa-bars ml-3 mt-5 cursor-pointer text-[#001A72]" onClick={handleVisibility }></i></h1>}
                 { !visible && <i className="fa-solid fa-xl ml-3 mt-5  fa-xmark text-[#001A72] cursor-pointer"onClick={handleUnVisibility }></i>}
            </div>
           { !visible && <div className='flex flex-col space-y-7 ml-12'>
                  <div className='flex mt-2 items-center'>
                        <i className="fa-solid fa-house"></i>
                        <Link to='/home'><h1 className='ml-2 text-[#04283D] border border-x-0 border-b-2 border-[#04283D] border-t-0' >Home</h1></Link>
                  </div>
                  <div className='flex mt-2 items-center'>
                        <i className="fa-solid fa-circle-play"></i>
                        <h1 className='ml-2 text-[#04283D] border border-x-0 border-b-2 border-[#04283D] border-t-0 cursor-pointer' onClick={explore} >Explore</h1>
                  </div>
                  <div className='flex mt-2 items-center '>
                        <i className="fa-solid fa-comment"></i>
                        <Link to='/chat'><h1 className='ml-2 text-[#04283D] border border-x-0 border-b-2 border-[#04283D] border-t-0' >Chats</h1></Link>
                  </div>
                  <div className='flex mt-2 items-center '>
                        <i className="fa-solid fa-bookmark"></i>
                        <Link to="/savedPost"><h1 className='ml-2 text-[#04283D] border border-x-0 border-b-2 border-[#04283D] border-t-0' >Saved Posts</h1></Link>
                  </div>
                  <div className='flex mt-2 items-center '>
                        <i className="fa-solid fa-heart"></i>
                        <Link to="/like"><h1 className='ml-2 text-[#04283D] border border-x-0 border-b-2 border-[#04283D] border-t-0' >Liked Posts</h1></Link>
                  </div>
                  <div className='flex mt-2 items-center '>
                        <i className="fa-solid fa-user"></i>
                        <Link to={"/profile/"+current._id}><h1 className='ml-2 text-[#04283D] border border-x-0 border-b-2 border-[#04283D] border-t-0' >Profile</h1></Link>
                  </div>
            </div>}
            { !visible && <div className='fixed bottom-0 m-3'>
                  <div className='flex items-center'>
                        <i className="fa-solid fa-xl fa-arrow-right-from-bracket cursor-pointer" onClick={log}></i>
                        <h1 className='ml-2 text-[#04283D]'>Logout</h1>
                  </div>

            </div>}
      </div>


      </>
  )
}

export default SideBar