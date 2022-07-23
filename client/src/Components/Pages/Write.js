import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'

function Write() {
  return (
      <>
      <Navbar/>
        <div className='flex justify-between bg-[#2D3B58]'>
          <div>
            <SideBar/>
          </div>
          <div className='flex flex-col md:p-0 md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll md:border md:border-x-0 md:border-r-2 md:border-[#BED7F8] md:border-t-0 flex-auto mb-2 md:mb-0'>
              Write
          </div>
        </div>
        <Footer/>
      </>
  )
}

export default Write