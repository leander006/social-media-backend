import React, { useEffect } from 'react'

import Navbar from '../Navbar'

import { useDispatch, useSelector } from 'react-redux'
import { postError, postStart, postSuccess } from '../../redux/Slice/postSlice'
import axios from 'axios'
import Cookie from "js-cookie"
import SideBar from '../SideBar'
import Footer from '../Footer'


import Pin from '../GridSystem/Pin'

import { useNavigate } from 'react-router-dom'
import Skeleton from '../Skeleton/Skeleton'

const sizeArray = ["sm", "md", "lg"];

function Explore() {
  const {click} = useSelector(state =>state.user)
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get('token')}`
    }
  }
  const {allpost,loading} = useSelector(state =>state.post)


useEffect(() => {
  const getAllPost = async() =>{
    try {
      dispatch(postStart())
      const {data} = await axios.get("http://localhost:3001/api/post",config)
      dispatch(postSuccess(data))
    } catch (error) {
      dispatch(postError())
         console.log(error?.response?.data);
    }
  }
  getAllPost()
  
},[] )
  

  return (
    <>
    <Navbar/>
      <div className='flex bg-[#2D3B58]'>
        <div>
          <SideBar/>
        </div>
        <div className='flex  mb-4'>
          {!true?<div className='flex md:hidden m-auto mt-1 items-center bg-slate-200 rounded-md'>
                <input className='rounded-md m-2 p-1' type="text" placeholder='search your friends'></input>
                <i className="fa-solid fa-xl fa-magnifying-glass ml-1"></i>
          </div>:<></>}
      { !loading? <div className={click?'m-0 w-screen lg:w-[87vw] md:w-[77vw] p-3  h-[calc(100vh-5rem)] md:h-[calc(100vh-2.7rem)] overflow-y-scroll justify-center absolute grid auto-rows-2fr grid-cols-8':'m-0  w-screen md:w-[93%] p-3 bg-[#2D3B58] h-[calc(100vh-6.9rem)] md:h-[calc(100vh-2.7rem)] overflow-y-scroll justify-center md:absolute grid auto-rows-2fr grid-cols-8'}  >
    {allpost?.map((p) =>(
        <Pin url={p.content} id={p._id} key={p._id} size={sizeArray[Math.floor(Math.random() * 3)]}  />
      )
    )}
  </div>:<Skeleton/>}
        </div>

      </div>
      <Footer/>
    </>
    
  )
}

export default Explore











{/* <div className=' break-inside-avoid'>
                  <img src='image1.jpeg'></img>
            </div>
            <div className=' break-inside-avoid'>
                  <img src='image2.jpeg'></img>
            </div>
            <div className='break-inside-avoid'>
                  <img src='image3.jpeg'></img>
            </div>
            <div className=' break-inside-avoid'>
                  <img src='images4.jpeg'></img>
            </div>
            <div className='break-inside-avoid'>
                  <img src='images5.jpeg'></img>
            </div>
            <div className='break-inside-avoid'>
                  <img src='images6.jpeg'></img>
            </div>
            <div className=' break-inside-avoid'>
                  <img src='images7.jpeg'></img>
            </div>
            <div className=' break-inside-avoid'>
                  <img src='images8.jpeg'></img>
            </div>
            <div className=' break-inside-avoid'>
                  <img src='images9.jpeg'></img>
            </div> */}

            // <div className=' break-inside-avoid'>
            //       <img src='images4.jpeg'></img>
            // </div>
            // <div className='break-inside-avoid'>
            //       <img src='images5.jpeg'></img>
            // </div>
            // <div className='break-inside-avoid'>
            //       <img src='images6.jpeg'></img>
            // </div>
            // <div className=' break-inside-avoid'>
            //       <img src='images7.jpeg'></img>
            // </div>

            // <div className=' break-inside-avoid'>
            //       <img src='image1.jpeg'></img>
            // </div>
            // <div className=' break-inside-avoid'>
            //       <img src='image2.jpeg'></img>
            // </div>
            // <div className='break-inside-avoid'>
            //       <img src='image3.jpeg'></img>
            // </div>


//             <div className=' break-inside-avoid'>
//                   <img src='images8.jpeg'></img>
//             </div>
//             <div className=' break-inside-avoid'>
//                   <img src='images9.jpeg'></img>
//             </div>
{/* <div className='rows-3  md:columns-4 lg:columns-5 xl:columns-7 h-[calc(100vh-6rem)] md:h-[calc(100vh-4.5rem)] overflow-y-scroll mx-auto space-y-3 bg-white p-4 w-screen gap-3 md:w-11/12  md:mt-4 my-3'> */}

//             <div className=' break-inside-avoid'>
//                   <img src='images4.jpeg'></img>
//             </div>
