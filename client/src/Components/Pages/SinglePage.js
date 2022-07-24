import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import Comment from '../Comment'
import Navbar from '../Navbar'
import SideBar from '../SideBar'

function SinglePage({name}) {
      const [likes, setLikes] = useState(false)
      const [saved, setSaved] = useState(false)
      const handleLikes =(e) =>{
            e.preventDefault()
            setLikes(!likes)
      }
      const handleSaved =(e) =>{
            e.preventDefault()
            setSaved(!saved)
      }
  return (
      <>
      <Navbar/>
        <div className='flex bg-[#2D3B58]'>
          <div>
            <SideBar/>
          </div>
          <div className='flex flex-col p-4 md:items-center lg:justify-center md:p-4 md:flex-row h-[calc(100vh-4.3rem)] w-screen md:h-[calc(100vh-2.7rem)] overflow-y-scroll '>
              <div className='h-1/4 md:h-3/4 lg:h-5/6 md:border border-[#BED7F8] md:w-[50%] lg:w-2/5'>
                        <img className='object-contain md:object-cover w-full h-full' src='/images/images9.jpeg'></img>
              </div>
              <div className='flex flex-col md:border border-[#BED7F8] p-2 h-3/4 md:h-3/4 lg:h-5/6 md:w-[50%] lg:w-2/5  '>
                  <div className='flex p-1 ' >
                        <img src='/images/noProfile.jpeg' alt='image' className='w-10 h-10  rounded-full cursor-pointer border' />
                        <div className='main '>
                        <Link to="/profile"><h1 className='capitalize ml-2 font-sans cursor-pointer font-bold text-white' >Leander</h1></Link>
                        <p className='ml-2 text-sm mt-3 text-slate-300 break-all'>dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It </p>
                        </div>
                  </div>
                  <div className='border-x-0 border-t-2 border-[#BED7F8] md:h-3/4 border-b-0 overflow-y-scroll'>
                  <Comment/>
                  <Comment/>
                  <Comment/>
                  <Comment/>
                        
                  </div>
                  <div className='flex my-3 mx-3 text-white  items-center justify-between' >
                <div className='flex items-center' >
                      <div className='flex likes cursor-pointer  flex-col justify-center mt-3' onClick={handleLikes}>
                              {!likes ? <i className="fa-regular fa-heart fa-2xl pr-3"/>:
                              <i className="fa-solid fa-heart fa-2xl pr-3 text-red-700"/>
                              }
                              <h1 className='mt-3 ml-1'>23</h1>
                      </div>
                        <div>
                              <i className="fa-regular fa-2xl fa-comment " ></i>
                              <h1>23</h1>
                        </div>
                        
                </div>
                 <div className=' cursor-pointer'>
                        {saved ?<i className="fa-solid fa-xl fa-bookmark" onClick={handleSaved}></i>:
                        <i className="fa-regular fa-xl fa-bookmark" onClick={handleSaved}></i>}
                </div>             
                
          </div>
                  <div className='flex items-center bg-[#455175] rounded-md'>
                        <input className='w-full rounded-md p-1' placeholder='Comment here' type="text"></input>
                        <i className="fa-solid fa-xl fa-paper-plane p-2 text-[#BED7F8] cursor-pointer "></i>
                  </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
  )
}

export default SinglePage