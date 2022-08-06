import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SearchSkeleton from './Skeleton/SearchSkeleton'
import Cookie from "js-cookie"  
import axios from 'axios';
import SearchFreind from './SearchFreind'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../redux/Slice/userSlice'




function Navbar() {
const [visible, setVisible] = useState(false);
const [search, setSearch] = useState("");
const [searched, setSearched] = useState([]);
const dispatch = useDispatch();
const navigate = useNavigate();
const {currentUser} = useSelector(state => state.user);
const config ={
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${Cookie.get('token')}`
      }
    }

    const log = (e)=>{
      e.preventDefault();
      dispatch(logout())
      window.open("http://localhost:3001/api/auth/logout", "_self");
      navigate("/")
      }

const handleSearch = async(query)=>{
      setSearch(query)
      if(!query){
        return
      }
      try {
          const {data} = await axios.get("http://localhost:3001/api/user/oneUser?name="+search,config)
          setSearched(data)

      } catch (error) {
          console.log(error);      
      }
  }

const current =currentUser.others?currentUser.others:currentUser
  return (

    <div className='container z-50'>
          <div className='flex justify-between bg-[#455175] xl:w-screen'>
                <div className='font-bold p-2 text-white'>
                        <h1>Logo</h1>
                </div>

                <div className='md:flex hidden h-8 w-1/3 m-auto mt-1 items-center bg-[#455175] rounded-md'>
                <input className='rounded-md focus:outline-[#BED7F8] w-full h-full p-1' value={search} type="text" onChange={e =>handleSearch(e.target.value)}  placeholder='search your friends'></input>
                </div>

                
                        <div className=" hidden md:flex fixed z-30 xl:ml-[26rem] lg:ml-64 ml-44 mt-12 bg-[#a1bcf1]">
                              <div className="md:w-64 lg:w-80 xl:w-96 ">
                              {searched?.map((s) =>(
                                    <SearchFreind key={s._id} search={s}/>
                              ))}
                            
                              </div>
                        </div>
              
              
              
                <div className='flex items-center text-white'>
                <div className='flex lg:hidden items-center mr-2 '>
                        <i className="fa-solid  text-[#BED7F8] fa-xl fa-arrow-right-from-bracket cursor-pointer" onClick={log}></i>
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
          
         
          
      </div>
  )
}

export default Navbar
