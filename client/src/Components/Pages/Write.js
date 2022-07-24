import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'

function Write() {

  const navigate = useNavigate()

  const ok = () =>{
    navigate("/home")
  }

const cancel = () =>{
    navigate("/home")
  }

  return (
    <>
    <Navbar/>
      <div className='flex bg-[#2D3B58]'>
        <div>
          <SideBar/>
        </div>
        <div className='flex flex-col md:justify-center  md:m-auto w-screen h-[calc(100vh-4.3rem)] lg:w-[60%] md:w-[75%] md:h-[calc(100vh-2.7rem)]'>
                <div className='flex justify-between p-4'>
                      <div className='flex items-center space-x-5'>
                            <i className="fa-solid fa-2xl fa-xmark cursor-pointer text-[#8aaaeb]" onClick={cancel}></i>
                            <h1 className='font-bold text-xl'>Post</h1>
                      </div>
                      <div>
                            <i className="fa-solid fa-2xl cursor-pointer fa-check text-[#8aaaeb]" onClick={ok}></i>
                      </div>
                </div>

                <div className='flex flex-col justify-center items-center' >
                      <img className='image w-28 h-28 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 ' src='/images/noImage.png' alt='image'/>
                      <label className='text-[#8aaaeb] cursor-pointer font-bold text-2xl mt-2 hover:text-[#6795f1]' htmlFor='forFile'>Upload</label>
                      <input type="file" id='forFile' accept='image/png , image/jpg, image/jpeg ,video/mp4' style={{display:"none"}}  name="file" required />
                </div>

                <div className='bottom'>
                      <div className='p-2'>
                            <h1 className='text-[#8aaaeb] '>Caption</h1>
                            <textarea className='bg-[#2D3B58] border-b w-full mt-2 outline-none' type="text"></textarea>
                      </div>


                </div> 
                
              
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Write