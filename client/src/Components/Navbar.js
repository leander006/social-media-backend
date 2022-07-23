import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  return (

    <div className='container'>
          <div className='flex justify-between bg-[#455175] xl:w-screen'>
                <div className='font-bold p-2 text-white'>
                        <h1>Logo</h1>
                </div>
                <div className='md:flex hidden h-8 w-1/3 m-auto mt-1 items-center bg-[#455175] rounded-md'>
                <input className='rounded-md  w-full h-full p-1 ' type="text"  placeholder='search your friends'></input>
                <i className="fa-solid fa-xl fa-magnifying-glass ml-1 text-[#BED7F8] cursor-pointer "></i>
                </div>
                <div className='flex items-center text-white'>
                  <div className='mr-2 text-[#BED7F8] cursor-pointer'>
                  <i className="fa-solid fa-xl fa-calendar-plus"></i>
                        {/* <input type="file"/> */}
                  </div>
                  <div className='mr-2 text-[#BED7F8] cursor-pointer'>
                        <Link to="/chat"><i className="fa-regular fa-xl fa-comment"></i></Link>
                  </div>
                  <div className='font-bold'>
                        <h1>Leander</h1>
                  </div>
                  <div className='mr-2 cursor-pointer'>
                        <Link to="/profile"><img className='rounded-full  w-10 p-1' src='/images/noProfile.jpeg' /></Link>
                  </div>
                </div>
          </div>
      </div>
  )
}

export default Navbar
