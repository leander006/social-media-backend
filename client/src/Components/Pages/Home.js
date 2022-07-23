import React from 'react'
import ExploreMore from '../ExploreMore'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import Suggested from '../Suggested'


function Home() {
  return (
    <>
    <Navbar/>
      <div className='flex justify-between bg-[#2D3B58]'>
        <div>
          <SideBar/>
        </div>
        <div className='flex flex-col md:p-0  md:items-center h-[calc(100vh-4.3rem)]  md:h-[calc(100vh-2.7rem)] overflow-y-scroll md:border md:border-x-0 md:border-r-2 md:border-[#BED7F8] md:border-t-0 flex-auto mb-2 md:mb-0'>
        <ExploreMore  name={"leander"} profile={"/images/noProfile.jpeg"} content={"/images/example.jpeg"}liked={"10"} message={"this are messages"} caption={"This is caption"} count={"6"} likecount={"3"} likename={"aadil"} />
        <ExploreMore  name={"leander"} profile={"/images/noProfile.jpeg"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} liked={"10"} message={"this are messages"} caption={"This is caption"} count={"6"} likecount={"3"} likename={"aadil"} />
        <ExploreMore  name={"leander"} profile={"/images/noProfile.jpeg"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} liked={"10"} message={"this are messages"} caption={"This is caption"} count={"6"} likecount={"3"} likename={"aadil"} />
        </div>
        <div className='hidden md:flex md:w-60 h-[calc(100vh-3.5rem)] overflow-y-scroll lg:w-80 xl:w-96 ml-2 flex-col  mt-3 text-white '>
              <h1>Suggested Followers</h1>
              <div className='mt-3 ml-3'>
                    <Suggested name="Leander"/>
                    <Suggested name="Riya"/>
                    <Suggested name="Rejoy"/>
                    <Suggested name="Natasha"/>
                    <Suggested name="Rohit"/>
                    <Suggested name="Ms Dhoni"/>
                    <Suggested name="Milka"/>
                    <Suggested name="Don"/>
                    <Suggested name="Knock"/>
                    <Suggested name="Angela"/>
                    <Suggested name="Aadil"/>
                    <Suggested name="Shiv"/>
                    <Suggested name="Leander"/>
                    <Suggested name="Riya"/>
                    <Suggested name="Rejoy"/>
                    <Suggested name="Natasha"/>
                    <Suggested name="Rohit"/>
                    <Suggested name="Ms Dhoni"/>
                    <Suggested name="Milka"/>
                    <Suggested name="Don"/>
                    <Suggested name="Knock"/>
                    <Suggested name="Angela"/>
                    <Suggested name="Aadil"/>
                    <Suggested name="Shiv"/>
      
              </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Home