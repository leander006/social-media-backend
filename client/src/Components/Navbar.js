import React from 'react'

function Navbar() {

  return (

    <div className='container'>
          <div className='flex justify-between bg-[#2D3B58] xl:w-screen'>
                <div className='font-bold p-2 text-white'>
                        <h1>Logo</h1>
                </div>
                <div className='flex items-center text-white'>
                  <div className='mr-2 text-[#BED7F8] cursor-pointer'>
                        <i className="fa-solid fa-xl fa-calendar-plus"></i>
                  </div>
                  <div className='mr-2 text-[#BED7F8] cursor-pointer'>
                        <i className="fa-solid fa-xl fa-comment"></i>
                  </div>
                  <div className='font-bold'>
                        <h1>Leander</h1>
                  </div>
                  <div className='mr-2 cursor-pointer'>
                        <img className='rounded-full  w-10 p-1' src='noProfile.jpeg' ></img>
                  </div>
                </div>
          </div>
      </div>
  )
}

export default Navbar
