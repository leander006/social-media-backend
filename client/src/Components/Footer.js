import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='flex items-center bg-[#BED7F8] h-10 md:hidden justify-between p-2 fixed bottom-0 w-screen'>

          <div className='cursor-pointer'>
                  <Link to ="/home" ><i  className="fa-solid fa-xl fa-house"></i></Link>  
          </div>

          <div className='cursor-pointer'>
                  <Link to ="/chat" ><i  className="fa-solid fa-xl fa-comment"></i></Link>
          </div>

          <div className='cursor-pointer'>
                  <Link to ="/explore" ><i  className="fa-solid fa-xl fa-circle-play"></i></Link>
          </div>

          <div className='cursor-pointer'>
                  <Link to ="/home" ><i  className="fa-solid fa-xl fa-bookmark"></i></Link>
          </div>

          <div className='cursor-pointer'>
                  <Link to ="/home" ><i  className="fa-solid fa-xl fa-heart"></i></Link>
          </div>

          <div className='cursor-pointer'>
                  <Link to ="/home" ><i  className="fa-solid fa-xl fa-user"></i></Link>
          </div >

          <div className='cursor-pointer'>
                  <Link to ="/home" ><i  className="fa-solid fa-xl fa-gear"></i></Link> 
          </div>
    </div>
  )
}

export default Footer