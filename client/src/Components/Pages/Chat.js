import React, { useEffect, useState } from 'react'
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


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DirectMessage from '../DirectMessage'
import { useDispatch, useSelector } from 'react-redux'
import { chatError, chatStart, chatSuccess } from '../../redux/Slice/chatSlice'
import { messageError, messageStart, messageSuccess } from '../../redux/Slice/messageSlice'
import MessageSkeleton from '../Skeleton/MessageSkeleton'
import ConversationSkeleton from '../Skeleton/ConversationSkeleton'

function Chat() {
  const [currentChat, setCurrentChat] = useState(false)
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")
  const [searched, setSearched] = useState([])
  const [visi, setVisi] = useState(false)
  const {allChat} = useSelector(state => state.chat)
  const {allmessage,messageloading} = useSelector(state => state.message)
  const {currentUser,chatloading} = useSelector(state => state.user)

  const currentuser = currentUser._id?currentUser?._id:currentUser.others?._id

  const dispatch = useDispatch()
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
            toast.success("This are result", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
           
      } catch (error) {
        toast.warn("something went wrong try again", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      setVisible(!visible)
      setSearch("")       
  }

  useEffect(() => {
    const getChat = async() =>{
      try {
        dispatch(chatStart())
        const {data} = await axios.get("http://localhost:3001/api/chat",config)
        dispatch(chatSuccess(data))
      } catch (error) {
        dispatch(chatError())
          console.log(error?.response?.data);
      }
    }
    getChat()
  }, [currentUser])

  useEffect(() => {
    const getMessage = async() =>{
      try {
        dispatch(messageStart())
        const {data} = await axios.get("http://localhost:3001/api/message/get/"+currentChat._id,config)
        dispatch(messageSuccess(data))
      } catch (error) {
        dispatch(messageError())
          console.log(error?.response?.data);
      }
    }
    getMessage()
  }, [currentChat])

  const sendMessage = async(e) =>{
        e.preventDefault()
        try {
            dispatch(messageStart())
            const {data} = await axios.post("http://localhost:3001/api/message/"+currentChat._id,{content:message},config)
            dispatch(messageSuccess([...allmessage,data]))
            setMessage("")
        } catch (error) {
            dispatch(messageError())
            console.log(error?.response?.data);
        }
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
               {!visi && <div className="md:w-64 lg:w-80 xl:w-[30rem]  ">
                {searched.map((s) =>(
                        <DirectMessage key={s._id}  visi={visi} setVisi={setVisi} search={s}/>
                ))}
                </div>}
              </div>}
             
          </div>
                
        <div>
             <i className="fa-solid fa-2xl fa-user-plus ml-4 text-[#BED7F8] cursor-pointer"></i>
        </div>
       </div>

       
       {search && <ChatSearchSkeleton/>}
       <div className='md:h-[calc(100vh-6.7rem)] p-3 overflow-y-scroll'>
         {allChat ? !chatloading? allChat?.map((c) =>(
               <div className='individual-chat' key={c?._id} onClick={() =>{setCurrentChat(c)}} >
               <Conversation img={c?.isGroupChat ? c?.chatname : c?.users[0]?._id === currentuser  ? c?.users[1]?.profile :  c?.users[0]?.profile  } name={c?.isGroupChat ? c?.chatname : c?.users[0]?._id === currentuser  ? c?.users[1]?.username :  c?.users[0]?.username  } chat={c} key={c._id}  />
               </div>

         )):allChat?.map((c) =>(
           <div key={c._id} >
          <ConversationSkeleton key={c._id}/>
          </div>))
          :<div className='flex justify-center font-bold text-gray-400 text-xl'>No conversation</div>}
   </div>
         
       </div> 

        {currentChat? <div className='message w-[60%]'>
        <div className='flex justify-between items-center message  md:bg-[#84b6f7]'>
           <div className='flex h-12 items-center p-3'>
               <Link to="/profile"><img src={currentChat?.isGroupChat ? currentChat?.chatname : currentChat?.users[0]?._id === currentuser  ? currentChat?.users[1]?.profile :currentChat?.users[0]?.profile} alt='image' className='w-10 h-10  rounded-full cursor-pointer border'/></Link>
               <Link to="/profile"><h1 className='capitalize text-black ml-4 font-sans cursor-pointer ' >{currentChat?.isGroupChat ? currentChat?.chatname : currentChat?.users[0]?._id === currentuser  ? currentChat?.users[1]?.username :  currentChat?.users[0]?.username}</h1></Link>
           </div>
           {currentChat?.isGroupChat && <div>
                        <i className="fa-solid fa-xl fa-user-plus mr-4 text-black cursor-pointer"></i>
                    </div>}
   </div>
   <div className='md:h-[calc(100vh-10.2rem)] md:bg-[#BED7F8] p-3 overflow-y-scroll'>
   {!messageloading ? allmessage.map((m) =>(
                <Messages own={m.sender._id === currentuser} message={m} key={m._id}/>
            )):allmessage.map((m) =>(
              <MessageSkeleton key={m._id}/>
          ))}
   </div>
        <form className='flex bg-[#BED7F8] h-12 items-center p-2 m-3 mt-3 rounded-lg' >
          <input type="text" placeholder='Enter message' value={message} onChange={e =>setMessage(e.target.value)} className='w-full h-10 rounded-lg p-5 border'  />
           <button><i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400" onClick={sendMessage} ></i></button> 
          </form>
        </div>:<div className='flex m-auto items-center'><NopPreview/></div>}

        </div>
          {/* -------- */}

          {/* Mobile view */}


          <div className='flex md:hidden z-10 flex-col md:p-0 md:items-center w-screen '>
       
         {!currentChat ? <div className='conversation md:flex-1'>
            <div className='flex justify-between items-center md:p-3'>
              <div className='flex bg-[#455175] ml-2 w-full h-8 mt-2 items-center rounded-md'>
                    <input className='rounded-md  w-full h-full p-1' value={search} onChange={e =>setSearch(e.target.value)} type="text"  placeholder='search your friends'/>
                    <i className="fa-solid fa-xl fa-magnifying-glass ml-3 text-[#BED7F8] cursor-pointer " onClick={handleVisible}></i>
              </div>
                    <i className="fa-solid fa-xl mt-2 fa-user-plus ml-3 mr-1 text-[#BED7F8] cursor-pointer" ></i>
              {visible && <div className="flex mt-24 fixed z-30 ">
                <div className=" w-[92vw] p-2">
                {searched.map((s) =>(
                      <DirectMessage key={s._id} visi={visi} setVisi={setVisi} search={s}/>
                ))}
                </div> 
              </div>}
            </div>
            {search && <ChatSearchSkeleton/>}
            <div className='h-[calc(100vh-7.9rem)] md:h-[calc(100vh-2.7rem)] p-3 overflow-y-scroll'>
            {allChat ?!chatloading? allChat?.map((c) =>(
               <div className='individual-chat' key={c?._id} onClick={() =>{setCurrentChat(c)}} >
               <Conversation img={c?.isGroupChat ? c?.chatname : c?.users[0]?._id === currentuser  ? c?.users[1]?.profile :  c?.users[0]?.profile  } name={c?.isGroupChat ? c?.chatname : c?.users[0]?._id === currentuser  ? c?.users[1]?.username :  c?.users[0]?.username  } chat={c} key={c._id}  />
               </div>

         )):allChat?.map((c) =>(
           <div key={c._id} className=''>
          <ConversationSkeleton key={c._id}/>
          </div>))
          :<div className='flex justify-center font-bold text-gray-400 text-xl'>No conversation</div>}
            </div>
            
            </div> :
            <div className='message'>
            <div className='flex justify-between items-center message bg-[#8cbeff] md:hidden'>
                    <div className='flex h-12 items-center p-3'>
                    <i className="fa-solid mr-2 fa-xl cursor-pointer fa-arrow-left" onClick={() =>{setCurrentChat(!currentChat)}}></i>
                        <Link to="/profile"><img src={currentChat?.isGroupChat ? currentChat?.chatname : currentChat?.users[0]?._id === currentuser  ? currentChat?.users[1]?.profile :currentChat?.users[0]?.profile}  alt='image' className='w-10 h-10 rounded-full cursor-pointer border'/></Link>
                        <Link to="/profile"><h1 className='capitalize text-black ml-4 font-sans cursor-pointer'>{currentChat?.isGroupChat ? currentChat?.chatname : currentChat?.users[0]?._id === currentuser  ? currentChat?.users[1]?.username:currentChat?.users[0]?.username}</h1></Link>
                    </div>
                    {currentChat?.isGroupChat && <div>
                        <i className="fa-solid fa-xl fa-user-plus mr-4 text-black cursor-pointer"></i>
                    </div>}
            </div>
            <div className='h-[calc(100vh-12rem)] bg-[#BED7F8]  p-3 overflow-y-scroll'>
            {!messageloading ? allmessage.map((m) =>(
                <Messages message={m} own={m.sender._id === currentuser} key={m._id}/>
            )):allmessage.map((m) =>(
              <MessageSkeleton key={m._id}/>
          ))}
            </div>
            <form className='flex bg-[#BED7F8] h-12 items-center p-2 m-3 mt-3 rounded-lg' >
          <input type="text" placeholder='Enter message' value={message} onChange={e =>setMessage(e.target.value)} className='w-full h-full rounded-lg p-5 border' />
           <button><i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400" onClick={sendMessage} ></i></button> 
          </form>
          </div>}
 
          </div>

          {/* ---------- */}
        </div>
        <ToastContainer/>
        <Footer/>
      </>
  )
}
export default Chat
