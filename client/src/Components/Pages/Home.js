import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import Story from '../Story'

function Home() {
  return (
    <>
    <Navbar/>
      <div className='flex justify-between'>
        <div>
          <SideBar/>
        </div>
        <div className='bg-slate-800 flex-auto'>
          <div className=''>
                <Story/>
          </div>
          <div>

          </div>
            <h1>This is home page</h1>
        </div>
        <div className='hidden md:flex flex-1'>
            Suggestions
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home