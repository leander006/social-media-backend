import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Conversation from '../Conversation'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import Messages from '../Mesaages'
import NopPreview from '../NopPreview'
import ChatSearchSkeleton from '../Skeleton/ChatSearchSkeleton'
import Cookie from "js-cookie"  
import axios from 'axios';
import SearchFreind from '../SearchFreind'

function Chat() {
  const [currentChat, setCurrentChat] = useState(false)
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState("")
  const [searched, setSearched] = useState([])
  const config ={
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${Cookie.get('token')}`
      }
    }
  const handleVisible = async(e) =>{
      e.preventDefault()
      try {
            const {data} = await axios.get("http://localhost:3001/api/user/freind/search?name="+search,config)
            setSearched(data)
      } catch (error) {
            console.log(error.response.data);
      }
      setVisible(!visible)
      setSearch("")       
  }
  return (
      <>
      <Navbar/>
        <div className='flex bg-[#2D3B58]'>
          <div>
            <SideBar/>
          </div>
          {/* Destop view  */}
          <div className='hidden md:flex w-screen '>
       <div className='conversation w-[40%] border border-y-0'>
       <div className='flex justify-between items-center p-3'>
          <div className='flex bg-[#455175] w-full h-8 mt-1 items-center rounded-md'>
            <input className='rounded-md  w-full h-full p-1' value={search} type="text" onChange={e =>setSearch(e.target.value)}  placeholder='search your friends'></input>
            <i className="fa-solid fa-xl fa-magnifying-glass ml-3 text-[#BED7F8] cursor-pointer " onClick={ handleVisible}></i>
            {visible &&  <div className="shadow hidden md:flex mt-24 fixed z-30 ">
                <div className="md:w-64 lg:w-80 xl:w-[30rem]  ">
                {searched.map((s) =>(
                                    <SearchFreind key={s._id} search={s}/>
                              ))}
                </div>
              </div>}

          </div>
         
        <div>
             <i className="fa-solid fa-2xl fa-user-plus ml-4 text-[#BED7F8] cursor-pointer"></i>
        </div>
       </div>
       {search && <ChatSearchSkeleton/>}
       <div className='md:h-[calc(100vh-6.7rem)] p-3 overflow-y-scroll'>
         {/* {allChat?.map((c) =>(
               <div className='individual-chat' key={c?._id} onClick={() =>{setCurrentChat(c)}} >
               <Conversation name={c?.isGroupChat ? c?.chatname : c?.users[0]?._id === currentuser  ? c?.users[1]?.username :  c?.users[0]?.username  } id={c?._id} message={c?.latestMessage?.content} time={c?.latestMessage?.createdAt}  />
               </div>

         ))} */}
         <Conversation/>
         <Conversation/>
         <Conversation/>
         <Conversation/>
         <Conversation/>
         <Conversation/>
         <Conversation/>
         <Conversation/>
         <Conversation/>
         <Conversation/>

   </div>
         
       </div> 

        {currentChat? <div className='message w-[60%]'>
        <div className='flex justify-between items-center message  md:bg-[#84b6f7]'>
           <div className='flex h-12 items-center p-3'>
               <Link to="/profile"><img src="/images/noProfile.jpeg" alt='image' className='w-10 h-10  rounded-full cursor-pointer border'/></Link>
               <Link to="/profile"><h1 className='capitalize text-black ml-4 font-sans cursor-pointer ' >Leander</h1></Link>
           </div>
           <div>
               <i className="fa-solid fa-xl fa-user-plus mr-4 text-black cursor-pointer"></i>
           </div>
   </div>
   <div className='md:h-[calc(100vh-10.2rem)] md:bg-[#BED7F8] p-3 overflow-y-scroll'>
         <Messages/>
         <Messages/>
         <Messages/>
         <Messages/>
         <Messages/>
         <Messages/>
   </div>
        <form className='flex bg-[#BED7F8] h-12 items-center p-2 m-3 mt-3 rounded-lg' >
          <input type="text" placeholder='Enter message' className='w-full h-10 rounded-lg p-5 border' />
           <button><i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400" ></i></button> 
          </form>
        </div>:<div className='flex m-auto items-center'><NopPreview/></div>}

        </div>
          {/* -------- */}

          {/* Mobile view */}


          <div className='flex md:hidden z-10 flex-col md:p-0 md:items-center w-screen '>
       
         {!currentChat ? <div className='conversation md:flex-1'>
            <div className='flex justify-between items-center md:p-3'>
              <div className='flex bg-[#455175] w-full h-8 mt-1 items-center rounded-md'>
                    <input className='rounded-md  w-full h-full p-1' value={search} onChange={e =>setSearch(e.target.value)} type="text"  placeholder='search your friends'></input>
                    <i className="fa-solid fa-xl fa-magnifying-glass ml-3 text-[#BED7F8] cursor-pointer " onClick={handleVisible}></i>
              </div>
              <div>
                    <i className="fa-solid fa-2xl fa-user-plus ml-4 text-[#BED7F8] cursor-pointer" ></i>
              </div>
              {visible && <div className="flex mt-24 fixed z-30 ">
                <div className=" w-[92vw] p-2">
                      <div className='flex bg-slate-300 p-2'>
                      <Link to="/profile"><img src='/images/noProfile.jpeg' className="rounded-full h-10 w-10 cursor-pointer"></img></Link>
                            <div className="flex-1 ml-2 mt-2 ">
                                  <div className="h-3 ">Leander</div>
                            </div>  
                      </div>
                </div> 
              </div>}
            </div>
            {search && <ChatSearchSkeleton/>}
            <div className='h-[calc(100vh-7.9rem)] md:h-[calc(100vh-2.7rem)] p-3 overflow-y-scroll'>
                  {/* {allChat?.map((c) =>(
                        <div className='individual-chat' key={c?._id} onClick={() =>{setCurrentChat(c)}} >
                        <Conversation name={c?.isGroupChat ? c?.chatname : c?.users[0]?._id === currentuser  ? c?.users[1]?.username :  c?.users[0]?.username  } id={c?._id} message={c?.latestMessage?.content} time={c?.latestMessage?.createdAt}  />
                        </div>

                  ))} */}
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>
                  <Conversation/>

            </div>
            
            </div> :
            <div className='message'>
            <div className='flex justify-between items-center message bg-[#BED7F8] md:hidden'>
                    <div className='flex h-12 items-center p-3'>
                        <Link to="/profile"><img src="/images/noProfile.jpeg" alt='image' className='w-10 h-10  rounded-full cursor-pointer border'/></Link>
                        <Link to="/profile"><h1 className='capitalize text-black ml-4 font-sans cursor-pointer ' >Leander</h1></Link>
                    </div>
                    <div>
                        <i className="fa-solid fa-xl fa-user-plus mr-4 text-black cursor-pointer"></i>
                    </div>
            </div>
            <div className='h-[calc(100vh-12rem)] md:h-[calc(100vh-2.7rem)] p-3 overflow-y-scroll'>
                  <Messages/>
                  <Messages/>
                  <Messages/>
                  <Messages/>
                  <Messages/>
                  <Messages/>
            </div>
            <form className='flex bg-[#BED7F8] h-12 items-center p-2 m-3 mt-3 rounded-lg' >
          <input type="text" placeholder='Enter message' className='w-full h-full rounded-lg p-5 border' />
           <button><i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400" ></i></button> 
          </form>
          </div>}
 
          </div>

          {/* ---------- */}
        </div>
        <Footer/>
      </>
  )
}

export default Chat



// <div className='hidden md:flex w-screen '>
       
// <div className='conversation'>
  //  <div className='flex justify-between items-center p-3'>
  //    <div className='flex bg-[#455175] w-full h-8 mt-1 items-center rounded-md'>
  //          <input className='rounded-md  w-full h-full p-1 ' type="text"  placeholder='search your friends'></input>
  //          <i className="fa-solid fa-xl fa-magnifying-glass ml-3 text-[#BED7F8] cursor-pointer "></i>
  //    </div>
  //    <div>
  //          <i className="fa-solid fa-2xl fa-user-plus ml-4 text-[#BED7F8] cursor-pointer"></i>
  //    </div>
     
  //  </div>
  //  <div className='md:h-[calc(100vh-6.7rem)] p-3 overflow-y-scroll'>
  //        {/* {allChat?.map((c) =>(
  //              <div className='individual-chat' key={c?._id} onClick={() =>{setCurrentChat(c)}} >
  //              <Conversation name={c?.isGroupChat ? c?.chatname : c?.users[0]?._id === currentuser  ? c?.users[1]?.username :  c?.users[0]?.username  } id={c?._id} message={c?.latestMessage?.content} time={c?.latestMessage?.createdAt}  />
  //              </div>

  //        ))} */}
  //        <Conversation/>
  //        <Conversation/>
  //        <Conversation/>
  //        <Conversation/>
  //        <Conversation/>
  //        <Conversation/>
  //        <Conversation/>
  //        <Conversation/>
  //        <Conversation/>
  //        <Conversation/>

  //  </div>
  
//    </div> 
   
//   {!currentChat ?  <div className='message '>
  //  <div className='flex justify-between items-center message bg-[#BED7F8] md:hidden'>
  //          <div className='flex h-12 items-center p-3'>
  //              <Link to="/profile"><img src="/images/noProfile.jpeg" alt='image' className='w-10 h-10  rounded-full cursor-pointer border'/></Link>
  //              <Link to="/profile"><h1 className='capitalize text-black ml-4 font-sans cursor-pointer ' >Leander</h1></Link>
  //          </div>
  //          <div>
  //              <i className="fa-solid fa-xl fa-user-plus mr-4 text-black cursor-pointer"></i>
  //          </div>
  //  </div>
  //  <div className='h-[calc(100vh-7.9rem)] md:h-[calc(100vh-2.7rem)] p-3 overflow-y-scroll'>
  //        <Messages/>
  //        <Messages/>
  //        <Messages/>
  //        <Messages/>
  //        <Messages/>
  //        <Messages/>
  //  </div>
//  </div>:<NopPreview/>}