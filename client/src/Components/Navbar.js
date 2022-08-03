import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchSkeleton from './Skeleton/SearchSkeleton'
import Cookie from "js-cookie"  
import axios from 'axios';
import SearchFreind from './SearchFreind'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCurrentChat, setNotification } from '../redux/Slice/chatSlice'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
function Navbar() {
const [visible, setVisible] = useState(false);
const [search, setSearch] = useState("");
const [searched, setSearched] = useState([]);
const [Notifications, setNotifications] = useState(false);
const {currentUser} = useSelector(state => state.user);
const {notification,currentChat} = useSelector(state=>state.chat);
const dispatch = useDispatch();
const currentuser = currentUser._id?currentUser?._id:currentUser.others?._id
const config ={
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${Cookie.get('token')}`
      }
    }

// useEffect(() => {
//       const getNotifications = async() =>{
//             try {
//                   const {data} = await axios.get("http://localhost:3001/api/chat/notification",config)
//                   console.log(data);
//             } catch (error) {
                  
//             }
//       }
//       getNotifications();
// })


const handleVisible = async(e) =>{
      e.preventDefault()
      try {
            const {data} = await axios.get("http://localhost:3001/api/user/oneUser?name="+search,config)
            setSearched(data)
           
            toast.success("This are result", {
                  position: "bottom-center",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
      } catch (error) {
            toast.warn("something went wrong try again", {
                  position: "bottom-center",
                  autoClose: 1000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  })
      }
      setVisible(!visible)
      setSearch("")
      
}
console.log(notification);
const current =currentUser.others?currentUser.others:currentUser
  return (

    <div className='container z-50'>
          <div className='flex justify-between bg-[#455175] xl:w-screen'>
                <div className='font-bold p-2 text-white'>
                        <h1>Logo</h1>
                </div>
                {Notifications &&
                  <div>
                        {notification.length !== 0 ? <div className="fixed z-30 md:w-1/3 md:ml-[28rem] lg:ml-[42rem] xl:ml-[56rem] w-11/12 bg-[#5a6fac] h-[25vh] mt-8 ml-3">
                              <div className='h-full w-full overflow-y-scroll'>
                              {notification?.map((n)=>(
                                    <div className='bg-[#8fabff] my-1 mx-1 p-2 text-white' key={n._id} onClick={() =>{
                                          try {
                                                dispatch(setCurrentChat(n.chat))
                                                dispatch(setNotification(notification?.filter((ni) => ni !== n)));
                                                setNotifications(!Notifications);
                                          } catch (error) {
                                                console.log(error);
                                          }
                                    }}>{n?.chat?.isGroupChat?`New message in ${n?.chat?.chatname}`:`New message from ${n?.chat?.isGroupChat?n?.chat?.chatname:currentuser === n?.chat?.users[0]?._id ? n?.chat?.users[1]?.username:n?.chat?.users[0]?.username}`}</div>
                              ))}
                              </div>
                        </div>:<div className="fixed z-30 md:w-1/4 md:ml-[28rem] lg:ml-[42rem] xl:ml-[60rem] w-6/12 bg-[#5a6fac] mt-8 ml-12 text-center p-2 text-white">No notifications</div>}
                  </div>}
                <div className='md:flex hidden h-8 w-1/3 m-auto mt-1 items-center bg-[#455175] rounded-md'>
                <input className='rounded-md focus:outline-[#BED7F8] w-full h-full p-1' value={search} type="text" onChange={e =>setSearch(e.target.value)} placeholder='search your friends'></input>
                <i className="fa-solid fa-xl fa-magnifying-glass ml-1 text-[#BED7F8] cursor-pointer " onClick={handleVisible}></i>
                </div>

                {visible &&
                        <div className=" hidden md:flex fixed z-30 ">
                              <div className="md:w-64 lg:w-80 xl:w-[30rem] xl:ml-[25rem] lg:ml-[18rem] md:mt-10 md:ml-[12rem]">
                              {searched.map((s) =>(
                                    <SearchFreind key={s._id} search={s}/>
                              ))}
                              </div>
                        </div>
              }
              
                
                <div className='flex items-center text-white'>
                <div className='mr-2 text-[#BED7F8] cursor-pointer' onClick={e=>setNotifications(!Notifications)}>
                <NotificationBadge count={notification?.length} effect={Effect.SCALE}/>
                        <i className="fa-solid fa-xl fa-bell cursor-pointer" >
                        </i>
                  </div>
                  
                  <div className='mr-2 text-[#BED7F8] cursor-pointer'>
                        <Link to="/write"><i className="fa-solid fa-xl fa-calendar-plus"></i></Link>
                  </div>
                  <div className='mr-2 text-[#BED7F8] cursor-pointer'>
                        <Link to="/chat"><i className="fa-regular fa-xl fa-comment"></i></Link>
                  </div>
                  <div className='font-bold'>
                        <h1>{current?.username}</h1>
                  </div>
                  <div className='mr-2 cursor-pointer'>
                        <Link to={"/profile/"+current._id}><img className='rounded-full w-10 h-10 p-1' src={currentUser?.others?currentUser.others?.profile:currentUser.profile} /></Link>
                  </div>
                </div>
          </div>
          
          <ToastContainer/>
          {search && <SearchSkeleton/>}
      </div>
  )
}

export default Navbar
