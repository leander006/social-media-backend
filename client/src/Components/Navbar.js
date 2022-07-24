import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchSkeleton from './Skeleton/SearchSkeleton'

function Navbar() {
const [visible, setVisible] = useState(false)
const [search, setSearch] = useState("")
const {currentUser} = useSelector(state => state.user)

const handleVisible = (e) =>{
      e.preventDefault()
      setSearch("")
      setVisible(!visible)
}
  return (

    <div className='container z-50'>
          <div className='flex justify-between bg-[#455175] xl:w-screen'>
                <div className='font-bold p-2 text-white'>
                        <h1>Logo</h1>
                </div>
                <div className='md:flex hidden h-8 w-1/3 m-auto mt-1 items-center bg-[#455175] rounded-md'>
                <input className='rounded-md  w-full h-full p-1' value={search} type="text" onChange={e =>setSearch(e.target.value)} placeholder='search your friends'></input>
                <i className="fa-solid fa-xl fa-magnifying-glass ml-1 text-[#BED7F8] cursor-pointer " onClick={handleVisible}></i>
                </div>

                {visible &&<div className=" hidden md:flex fixed z-30 ">
                        <div className="md:w-64 lg:w-80 xl:w-[30rem] xl:ml-[25rem] lg:ml-[18rem] md:mt-10 md:ml-[12rem]">
                              <div className='flex bg-slate-300 p-2'>
                              <Link to="/profile"><img src='/images/noProfile.jpeg' className="rounded-full h-10 w-10 cursor-pointer"></img></Link>
                                    <div className="flex-1 md:ml-2 md:mt-2">
                                          <div className="h-3 ">name</div>
                                    </div>  
                              </div>
                        </div>
                </div>}
                
                <div className='flex items-center text-white'>
                  <div className='mr-2 text-[#BED7F8] cursor-pointer'>
                        <Link to="/write"><i className="fa-solid fa-xl fa-calendar-plus"></i></Link>
                  </div>
                  <div className='mr-2 text-[#BED7F8] cursor-pointer'>
                        <Link to="/chat"><i className="fa-regular fa-xl fa-comment"></i></Link>
                  </div>
                  <div className='font-bold'>
                        <h1>{currentUser.username}</h1>
                  </div>
                  <div className='mr-2 cursor-pointer'>
                        <Link to="/profile"><img className='rounded-full w-10 p-1' src={currentUser.profile} /></Link>
                  </div>
                </div>
          </div>
          {search && <SearchSkeleton/>}
      </div>
  )
}

export default Navbar
