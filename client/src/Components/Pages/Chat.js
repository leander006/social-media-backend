import React, { useEffect, useRef, useState } from 'react'
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
import {io} from  "socket.io-client"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DirectMessage from '../DirectMessage'
import { useDispatch, useSelector } from 'react-redux'
import { chatError, chatStart, chatSuccess, setCurrentChat, setNotification } from '../../redux/Slice/chatSlice'
import { messageError, messageStart, messageSuccess } from '../../redux/Slice/messageSlice'
import MessageSkeleton from '../Skeleton/MessageSkeleton'
import ConversationSkeleton from '../Skeleton/ConversationSkeleton'
import GroupUser from '../GroupUser'
import ListItems from '../ListItems'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

var socket,selectedChatCompare
const Endpoint="http://localhost:3001"


function Chat() {
  const [visible, setVisible] = useState(false)
  const scrollRef = useRef()
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")
  const [searched, setSearched] = useState([])
  const [groupSearch, setGroupSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState([])
  const [addUser, setAddUser] = useState([])
  const [name, setName] = useState("")
  const [searchResult, setSearchResult] = useState(false)
  const [addUserGroup, setAdddUserGroup] = useState(false)
  const [visi, setVisi] = useState(false)
  const {allChat,notification,currentChat} = useSelector(state => state.chat)
  const {allmessage,messageloading} = useSelector(state => state.message)
  const {currentUser,chatloading} = useSelector(state => state.user)
  const [chatname, setChatname] = useState("")
  const [Notifications, setNotifications] = useState(false);
  const currentuser = currentUser._id?currentUser?._id:currentUser.others?._id
  const [loading, setLoading] = useState(false);
  // Socket //
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  useEffect(() => {
    socket= io(Endpoint)
    socket.emit("setup",currentUser);
    socket.on("connected", () => setSocketConnected(true))
    socket.on("typing",() => setIsTyping(true));
    socket.on("stop typing",() => setIsTyping(false));
  },[])


  const typingHandler = (e) =>{
    setMessage(e.target.value)

    if(!socketConnected) return

    if(!typing){
          setTyping(true)
          socket.emit("typing",currentChat._id)
         
    }
    let lastTypingTime = new Date().getTime()
    var timerLength = 3000

    setTimeout(() => {
          var timenow = new Date().getTime()
          var timeDiff = timenow - lastTypingTime
          if(timeDiff >= timerLength && typing ){
                socket.emit("stop typing",currentChat._id)
                setTyping(false)
          }
    }, timerLength);
}

  //-------//
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
  const getNotification =async(newMessage)=>{
    if(!selectedChatCompare || selectedChatCompare._id === newMessage.chat._id){
      
      const {data} = await axios.put("http://localhost:3001/api/user/notification/notify",{id:newMessage._id},config)
    }
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
  }, [currentUser,message])

  useEffect(() => {
    const getMessage = async() =>{
      try {
        setLoading(true)
        dispatch(messageStart())
        const {data} = await axios.get("http://localhost:3001/api/message/get/"+currentChat._id,config)
        setLoading(false)
        dispatch(messageSuccess(data))
        socket.emit("join room",currentChat._id)
      } catch (error) {
        dispatch(messageError())
          console.log(error?.response?.data);
      }
    }
    getMessage()
    selectedChatCompare=currentChat;
  }, [currentChat])

  const sendMessage = async(e) =>{
        e.preventDefault()
        socket.emit("stop typing",currentChat._id);
        try {
            dispatch(messageStart())
            const {data} = await axios.post("http://localhost:3001/api/message/"+currentChat._id,{content:message},config)
            socket.emit("new message",data)
            dispatch(messageSuccess([...allmessage,data]))
            setMessage("")
        } catch (error) {
            dispatch(messageError())
            console.log(error?.response?.data);
        }
  }
  useEffect(() => {
    const getNotifications = async() =>{
          try {
                const {data} = await axios.get("http://localhost:3001/api/user/notification/notify",config)
                dispatch(setNotification(JSON.parse(data)))
          } catch (error) {
                console.log(error);
          }
    }
    getNotifications();
})

  useEffect(() => {
    socket.on("message recieved",(newMessage) =>{
          if(!selectedChatCompare || selectedChatCompare._id === newMessage.chat._id){
                // notification
                getNotification(newMessage)
                console.log("newMessage ",newMessage);
                  console.log("notification ",notification);
                if(!notification.includes(newMessage)){
                  
                  dispatch(setNotification(newMessage))
                  setMessage("")
                }
                
          }
          else{
                dispatch(messageSuccess([...allmessage,newMessage]))
          }  
    })
})
  const handleGroupChat = (e) =>{
        e.preventDefault()
        setSearchResult(!searchResult) 
        
  }
  const addGroup= (e) =>{
    e.preventDefault()
    setAdddUserGroup(!addUserGroup) 
    
}

const handleSearch = async(query)=>{
    setGroupSearch(query)
    if(!query){
      return
    }
    try {
        const {data} = await axios.get("http://localhost:3001/api/user/freind/search?name="+groupSearch,config)
        setAddUser(data)
    } catch (error) {
        console.log(error);
    }
}

const handleGroup =(addUser)=>{
    if(selectedUser.includes(addUser)){
      return
    }
    setSelectedUser([...selectedUser,addUser])
}

const handleCancel =(deleteUser) =>{
      setSelectedUser(selectedUser.filter((s)  => s._id !== deleteUser._id))
}

const handleRemove =async(deleteUser) =>{
  try {
      const {data} = await axios.put("http://localhost:3001/api/chat/remove/"+currentChat._id,{userId:deleteUser._id},config)
      setMessage("")
      dispatch(setCurrentChat(data))
  } catch (error) {
      console.log(error);
  }
}


const handleAdd =async(addUser) =>{
  const Users = currentChat?.users?.map((u) =>u._id)
  try {
    if(Users.includes(addUser._id)){
      console.log("Already included in grp ");
      return
    }
    else{
      const {data} = await axios.put("http://localhost:3001/api/chat/add/"+currentChat._id,{userId:addUser._id},config)
      dispatch(setCurrentChat(data));
    }
    
  } catch (error) {
      console.log(error);
  }
}

const handleRename =async(e) =>{
  e.preventDefault()
  try {
      const {data} = await axios.put("http://localhost:3001/api/chat/rename/"+currentChat._id,{chatname:chatname},config)
      dispatch(setCurrentChat(data));
  } catch (error) {
      console.log(error);
  }
}


const create = async(e)=>{
  e.preventDefault()
  try {
    dispatch(chatStart())
    const {data} = await axios.post("http://localhost:3001/api/chat",{name:name,
    users:JSON.stringify(selectedUser.map((u) =>u._id)),
    },config)
    dispatch(chatSuccess([data,...allChat,]))
    setCurrentChat(data)
    setSearchResult(!searchResult) 
    
  } catch (error) {
      console.log(error);
      dispatch(chatError())
  }

}

useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [currentChat]);


  return (
      <>
      <Navbar/>
        <div className='flex bg-[#2D3B58]'>
          <div>
            <SideBar/>
          </div>
          {Notifications &&
                  <div>
                        {notification.length !== 0 ? <div className="fixed z-30 md:w-1/3 w-11/12 bg-[#5a6fac] h-[25vh] mt-14 ">
                              <div className='h-full w-full overflow-y-scroll'>
                              {notification?.map((n)=>(
                                    <div className='bg-[#8fabff] my-1 mx-1 p-2 text-white cursor-pointer' key={n?._id} onClick={async() =>{
                                          try {
                                                dispatch(setCurrentChat(n?.chat))
                                                await axios.put("http://localhost:3001/api/user/notification/remove",{id:n?._id},config)
                                                console.log("Remove");
                                                dispatch(setNotification(notification?.filter((ni) => ni !== n?._id)));
                                                setNotifications(!Notifications);
                                          } catch (error) {
                                                console.log(error);
                                          }
                                    }}>{n?.chat?.isGroupChat?`New message in ${n?.chat?.chatname}`:`New message from ${n?.chat?.isGroupChat?n?.chat?.chatname:n?.sender?.username}`}</div>
                              ))}
                              </div>
                        </div>:<div className="fixed z-30 md:w-1/4 w-6/12 bg-[#5a6fac] mt-12 ml-1 text-center p-2 text-white">No notifications</div>}
                  </div>}
          {/* Destop view  */}
          <div className='hidden md:flex w-screen '>
       <div className='conversation w-[40%] border border-y-0'>
         
       <div className='flex justify-between items-center p-3'>
       <div className='mr-2 text-[#BED7F8] cursor-pointer' onClick={e=>setNotifications(!Notifications)}>
                <NotificationBadge count={notification?.length} effect={Effect.SCALE}/>
                        <i className="fa-solid fa-lg fa-bell cursor-pointer" >
                        </i>
        </div>
          <div className='flex bg-[#455175] w-full h-8 mt-1 items-center rounded-md'>
            <input className='rounded-md focus:outline-[#BED7F8] w-full h-full p-1' value={search} type="text" onChange={e =>setSearch(e.target.value)}  placeholder='search your friends'></input>
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
             <i className="fa-solid fa-xl fa-user-plus ml-4 text-[#BED7F8] cursor-pointer" onClick={handleGroupChat}></i>
        </div>
       
                  
       </div>       
       {search && <ChatSearchSkeleton/>}
       <div className='md:h-[calc(100vh-6.7rem)] p-3 overflow-y-scroll'>
         {allChat ? !chatloading? allChat?.map((c) =>(
               <div className='individual-chat' key={c?._id} onClick={() =>{dispatch(setCurrentChat(c))}} >
               <Conversation isTyping={isTyping} img={c?.isGroupChat?"images/noProfile.jpeg":currentuser === c?.users[0]?._id ? c?.users[1]?.profile:c?.users[0]?.profile} name={c?.isGroupChat?c?.chatname:currentuser === c?.users[0]?._id ? c?.users[1]?.username:c?.users[0]?.username} chat={c} key={c?._id}  />
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
               <img src={currentChat?.isGroupChat?"images/noProfile.jpeg":currentuser === currentChat?.users[0]?._id ? currentChat?.users[1]?.profile:currentChat?.users[0]?.profile} alt='image' className='w-10 h-10  rounded-full border'/>
               <div className='flex flex-col'>
                    <h1 className='capitalize text-black ml-4 font-sans ' >{currentChat?.isGroupChat?currentChat?.chatname:currentuser === currentChat?.users[0]?._id ? currentChat?.users[1]?.username:currentChat?.users[0]?.username}</h1>
                    {isTyping ?<div className='flex flex-wrap ml-4'>{currentChat?.isGroupChat?"Someone ":currentuser === currentChat?.users[0]?._id ? currentChat?.users[1]?.username:currentChat?.users[0]?.username} is typing..</div>:<div  className='flex flex-wrap ml-4'></div>}
               </div>

           </div>
          
           {currentChat?.isGroupChat && currentChat?.groupAdmin?._id === currentuser && <div>
                        <i className="fa-solid fa-xl fa-user-plus mr-4 text-black cursor-pointer" onClick={addGroup}></i>
                    </div>}
   </div>
   <div className='md:h-[calc(100vh-10.2rem)] md:bg-[#BED7F8] p-3 overflow-y-scroll'>
   {!loading ? allmessage.map((m) =>(
                <div key={m._id} ref={scrollRef}>
                <Messages own={m.sender._id === currentuser} message={m}/>
                </div>
            )):allmessage.map((m) =>(
              <MessageSkeleton key={m._id}/>
          ))}
   </div>
  
        <form className='flex bg-[#BED7F8] h-12 items-center p-2 m-3 mt-3 rounded-lg' >
          <input type="text" placeholder='Enter message' value={message} onChange={typingHandler} className='w-full h-10 rounded-lg p-5 border' required />
           <button><i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400" onClick={sendMessage} ></i></button> 
          </form>
        </div>:<div className='flex m-auto items-center'><NopPreview/></div>}

        </div>
          {/* -------- */}

          {/* Mobile view */}


          <div className='flex md:hidden z-10 flex-col md:p-0 md:items-center w-screen '>
       
         {!currentChat ? <div className='conversation md:flex-1'>
            <div className='flex justify-between items-center md:p-3'>
            <div className='mx-1 text-[#BED7F8] cursor-pointer' onClick={e=>setNotifications(!Notifications)}>
                <NotificationBadge count={notification?.length} effect={Effect.SCALE}/>
                        <i className="fa-solid fa-xl fa-bell cursor-pointer" >
                        </i>
        </div>
              <div className='flex bg-[#455175] ml-2 w-full h-8 mt-2 items-center rounded-md'>
                    <input className='rounded-md focus:outline-[#BED7F8] w-full h-full p-1' value={search} onChange={e =>setSearch(e.target.value)} type="text"  placeholder='search your friends'/>
                    <i className="fa-solid fa-xl fa-magnifying-glass ml-3 text-[#BED7F8] cursor-pointer " onClick={handleVisible}></i>
              </div>
                    <i className="fa-solid fa-xl mt-2 fa-user-plus ml-3 mr-1 text-[#BED7F8] cursor-pointer" onClick={handleGroupChat}></i>
             
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
              
               <div className='individual-chat' key={c?._id} onClick={() =>{dispatch(setCurrentChat(c))}} >
               <Conversation img={c?.isGroupChat?"images/noProfile.jpeg":currentuser === c?.users[0]._id ? c?.users[1]?.profile:c?.users[0]?.profile } name={c?.isGroupChat?c?.chatname:currentuser === c?.users[0]?._id ? c?.users[1]?.username:c?.users[0]?.username} chat={c} key={c?._id}  />
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
                    <i className="fa-solid mr-2 fa-xl cursor-pointer fa-arrow-left" onClick={() =>{dispatch(setCurrentChat(!currentChat))}}></i>
                        <Link to="/profile"><img src={currentChat?.isGroupChat?"images/noProfile.jpeg":currentChat?.users[0]?._id === currentuser?currentChat?.users[1]?.profile :currentChat?.users[0]?.profile }  alt='image' className='w-10 h-10 rounded-full cursor-pointer border'/></Link>
                        <Link to="/profile"><h1 className='capitalize text-black ml-4 font-sans cursor-pointer'>{currentChat?.isGroupChat ? currentChat?.chatname : currentChat?.users[0]?._id === currentuser  ? currentChat?.users[1]?.username:currentChat?.users[0]?.username}</h1></Link>
                    </div>
                    {currentChat?.isGroupChat && currentChat?.groupAdmin?._id === currentuser &&<div>
                        <i className="fa-solid fa-xl fa-user-plus mr-4 text-black cursor-pointer"></i>
                    </div>}
            </div>
            <div className='h-[calc(100vh-12rem)] bg-[#BED7F8]  p-3 overflow-y-scroll'>
            {!messageloading ? allmessage.map((m) =>(
              <div key={m._id} ref={scrollRef}>
                <Messages own={m.sender._id === currentuser} message={m}/>
                </div>
            ))
            :allmessage.map((m) =>(
              <MessageSkeleton key={m._id}/>
          ))
          }
            </div>
            <form className='flex bg-[#BED7F8] h-12 items-center p-2 m-3 mt-3 rounded-lg' >
          <input type="text" placeholder='Enter message' value={message} onChange={e =>setMessage(e.target.value)} className='w-full h-full rounded-lg p-5 border' required />
           <button><i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400" onClick={sendMessage} ></i></button> 
          </form>
          </div>}
 
          </div>

          {/* ---------- */}
        </div>

        {searchResult &&
                    <div className='fixed flex z-40 top-0 mt-24  w-screen lg:w-[32rem] xl:w-[36rem] xl:ml-96 md:w-96 md:ml-52 lg:ml-72'>
                      <form className='bg-[#1f62b9] h-full  m-auto w-11/12 ' onSubmit={create}>
                        <h1 className='text-2xl font-bold text-[#153f75] text-center' >Create group chat</h1>
                                     <div className='h-14 w-full p-1 mt-2 '>
                                        <input className='focus:outline-slate-900 w-full h-full p-1' type="text" placeholder='Enter group Name' value={name} onChange={e =>setName(e.target.value)} required/>
                                     </div>
                                     <div className='h-14 w-full p-1 '>
                                            <input className='focus:outline-slate-900 w-full h-full p-1' type="text" placeholder='Add user eg leander06' value={groupSearch} onChange={e =>handleSearch(e.target.value)} required  />
                                     </div>
                                     <div className='w-full '>
                                       <div className='flex flex-wrap'>
                                       {selectedUser?.map((s) =>(
                                         <ListItems user={s} key={s._id} handleFunction={() => handleCancel(s)} />
                                       ))}
                                       </div>
                                     </div>
                                     <div className='w-full p-1.5'>
                                          {addUser?.slice(0,6).map((a) =>(
                                            <GroupUser user={a} key={a._id} handleFunction={() => handleGroup(a)}/>
                                          ))}
                                     </div>
                                     <div className=' flex justify-around mb-2  ml-2 rounded p-1'>
                                       <input className='bg-blue-500 text-white p-1 rounded text-center' value="Create chat" type="submit"/>
                                       <input className='bg-blue-500 text-white p-1 rounded text-center' onClick={handleGroupChat} value="Cancel" type="button"/>
                                     </div>
                      </form>
                    </div>  
                  } 
                     {addUserGroup &&
                    <div className='fixed flex z-40 top-0 mt-24  w-screen lg:w-[32rem] xl:w-[36rem] xl:ml-96 md:w-96 md:ml-52 lg:ml-72'>
                      <div className='bg-[#1f62b9]  h-full  m-auto w-11/12 ' >
                        <h1 className='text-2xl font-bold text-[#153f75] text-center' >Update group</h1>
                                      <form className='h-14 flex w-full p-1 ' onSubmit={handleRename}>
                                            <input className='focus:outline-slate-900 m-0.5 w-full h-full p-1' type="text" placeholder={currentChat.chatname} vvalue={chatname} onChange={e =>setChatname(e.target.value)} required  />
                                            <input value="Rename" type="submit" className='bg-[#4c92ee] rounded m-1' />
                                     </form>
                                    
                                     <h1 className='text-center my-0.5 text-white'>Group member</h1>
                                     <div className='w-full '>
                                       <div className='flex flex-wrap'>
                                       {currentChat.users?.map((s) =>(
                                         <ListItems user={s} key={s._id} handleFunction={() => handleRemove(s)} />
                                       ))}
                                       </div>
                                     </div>
                                     <div className='h-14 w-full p-1 '>
                                            <input className='focus:outline-slate-900 w-full h-full p-1' type="text" placeholder='Add user eg leander06' value={groupSearch} onChange={e =>handleSearch(e.target.value)} required  />
                                     </div>
                                     <div className='w-full '>
                                       <div className='flex flex-wrap'>
                                       {selectedUser?.map((s) =>(
                                         <ListItems user={s} key={s._id} handleFunction={() => handleCancel(s)} />
                                       ))}
                                       </div>
                                     </div>
                                     <div className='w-full p-1.5'>
                                          {addUser?.slice(0,6).map((a) =>(
                                            <GroupUser user={a} key={a._id} handleFunction={() => handleAdd(a)}/>
                                          ))}
                                     </div>
                                     <div className='bg-blue-500 mb-2 w-fit ml-2 rounded p-1'>
                                       <input className='text-center' onClick={addGroup} value="Cancel" type="button"/>
                                     </div>
                      </div>
                    </div>  
                  }



        <ToastContainer/>
        <Footer/>
      </>
  )
}
export default Chat
