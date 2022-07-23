import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../Footer'
import Pin from '../GridSystem/Pin'
import Navbar from '../Navbar'
import SideBar from '../SideBar'

function Profile() {
  const {click} = useSelector(state =>state.user)
  const image =[
    "/images/image1.jpeg",
    "/images/images8.jpeg",
    "/images/image2.jpeg",
    "/images/image3.jpeg",
    "/images/images4.jpeg",
    "/images/images5.jpeg",
    "/images/images6.jpeg",
    "/images/images7.jpeg",
  ]

  const sizeArray = ["sm", "md", "lg"];
  return (
    <>
    <Navbar/>
      <div className='flex bg-[#2D3B58] '>
        <div className='sidebar'>
          <SideBar/>
        </div>
        <div className='h-[calc(100vh-20rem)] text-white xl:w-[94%] md:w-[70%] w-screen'>
            <div className='flex justify-center md:space-x-12 '>
                <div className='left image mt-6 xl:ml-[16rem] '>
                      <img className='rounded-full w-28 md:w-36 p-4 ' src='/images/noProfile.jpeg' />
                </div>
                <div className='right flex flex-col'>
                  <div className='top flex space-x-14 md:space-x-[12rem] xl:space-x-[16rem] lg:space-x-[14rem] mt-8 xl:mr-48'>
                        <div>
                              <h1>Leander</h1>
                        </div>
                        <div className='h-6 flex items-center rounded-lg p-0.5 text-black bg-[#BED7F8] cursor-pointer active:bg-[#88b8f7] active:rounded-lg'>
                              <h1>Message</h1>  
                        </div>    
                  </div>

                  <div className='mid-up flex space-x-4 md:space-x-10 lg:space-x-14 md:mb-3 mt-4'>
                    <div>
                    <h1>320 post</h1>
                    </div>
                    <div>
                    <h1>22 followers</h1>
                    </div>
                    <div>
                    <h1>24 following</h1>
                    </div>
                  </div>
                  <div className='mid-bottom bio mt-4 md:m-0 md:space-x-5 flex '>
                  <div >
                      <h1 className='font-bold'>Bio:</h1>
                  </div>
                  <div className='h-28 w-60 break-all pl-2 pr-2'>
                  dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                  </div>

                  </div>

                </div>
            </div>
            <div className='mt-24 flex justify-center items-center '>
              <div className='bg-[#BED7F8] text-black w-64 md:w-80 xl:w-[36rem] lg:w-96 rounded-lg flex active:bg-[#85b6f7] justify-center cursor-pointer'>
                  <h1 className='font-bold'>Edit Profile</h1>
              </div>
                <i className="fa-solid fa-xl ml-2 fa-user-plus cursor-pointer"></i>
            </div>

            <div className={click?'m-0 w-screen xl:w-[86vw] lg:w-[80vw] md:w-[77vw] p-3 md:mt-3 h-[calc(100vh-5rem)] md:h-[calc(100vh-24.8rem)] overflow-y-scroll justify-center absolute grid auto-rows-2fr grid-cols-8':'m-0  w-screen md:w-[93%] p-9 bg-[#2D3B58] md:h-[calc(100vh-24.8rem)] md:mt-3 overflow-y-scroll justify-center md:absolute grid auto-rows-2fr grid-cols-8'}  >
    {image.map((item) =>(
        <Pin url={item} key={item} size={sizeArray[Math.floor(Math.random() * 3)]}  />

      )
    )}
  </div>

        </div>

      </div>
      <Footer/>
    </>
  )
}

export default Profile