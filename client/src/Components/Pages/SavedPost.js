import React from 'react'
import ExploreAll from '../ExploreAll'
import ExploreMore from '../ExploreMore'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'

function YourPosts() {
  return (
    <>
    <Navbar/>
    <div className='flex justify-between bg-[#2D3B58]'>
        <div>
          <SideBar/>
        </div>
        <div className='flex flex-col md:p-0  md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll md:border md:border-x-0 md:border-r-2  md:border-[#BED7F8] md:border-t-0 flex-auto mb-2 md:mb-0'>
        <ExploreAll  name={"leander"} profile={"/images/noProfile.jpeg"} content={"/images/example.jpeg"} caption={"This is caption"} count={"6"} likecount={"3"}  />
        <ExploreAll  name={"Shiv"} profile={"/images/noProfile.jpeg"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} caption={"This is caption"} count={"6"} likecount={"3"} />
        <ExploreAll name={"Riya"} profile={"/images/noProfile.jpeg"} content={"/images/image1.jpeg"}  caption={"This is caption"} count={"6"} likecount={"3"}  />
        </div>
        
      </div>
    <Footer/>    
    </>
  )
}

export default YourPosts