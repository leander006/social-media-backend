import React, { useEffect, useRef, useState } from 'react'
import Conversation from '../Conversation'
import Mesaages from '../Mesaages'
import Navbar from '../Navbar'
import NopPreview from '../NopPreview'
import { messageError, messageStart, messageSuccess } from '../../redux/Slice/messageSlice';
import Cookie from "js-cookie"
import GetMessages from '../GetMessages'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { chatError, chatStart, chatSuccess } from '../../redux/Slice/chatSlice'
import {io} from  "socket.io-client"
import { useParams } from 'react-router-dom'
var socket,selectedChatCompare
// selectedChatCompare use for either emiting message or giving notification//
function Chats() {
 
      const [messages, setMessages] = useState("")
      const scrollRef = useRef()
      const {allmessage} = useSelector(state => state.message)
      const {currentUser} = useSelector(state => state.user)
      const {chatId} = useParams()
      const [getFreinds, setGetFreinds] = useState(false)
      const [currentChat, setCurrentChat] = useState()
      const [visible, setVisible] = useState(false)
      const [socketConnected, setSocketConnected] = useState(false)
      const [typing, setTyping] = useState(false)
      const [isTyping, setIsTyping] = useState(false)
      const dispatch = useDispatch()
      const {allChat} = useSelector(state => state.chat)
      const currentuser = currentUser._id?currentUser?._id:currentUser.others?._id
      
      // socket //

      useEffect(() => {
            socket= io("http://localhost:3001")
            socket.emit("setup",currentUser);
            socket.on("connection", () => setSocketConnected(true))
            socket.on("typing",() => setIsTyping(true));
            socket.on("stop typing",() => setIsTyping(false));
      },[])
      
      // end //

      const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${Cookie.get("token")}`
            }
          }
      const handleFrenids =(e) =>{
            e.preventDefault();
            setGetFreinds(!getFreinds);
      }

      const typingHandler = (e) =>{
            setMessages(e.target.value)

            if(!socketConnected) return

            if(!typing){
                  setTyping(true)
                  socket.emit("typing",chatId)
            }
            let lastTypingTime = new Date().getTime()
            var timerLength = 2500

            setTimeout(() => {
                  var timenow = new Date().getTime()
                  var timeDiff = timenow - lastTypingTime
                  if(timeDiff >= timerLength && typing ){
                        socket.emit("stop typing",chatId)
                        setTyping(false)
                  }
            }, timerLength);
      }

            useEffect(() => {
              const getMessages = async() =>{
                  try {
                    dispatch(messageStart())
                    const {data}= await axios.get(`http://localhost:3001/api/message/get/${chatId}`,config);
                    dispatch(messageSuccess(data))
                    selectedChatCompare=chatId
                    socket.emit("join room",chatId)
                  } catch (error){
                       dispatch(messageError()) 
                      console.log(error.message);
                  }
              };
              getMessages();
           
          },[chatId])
  
          const sendMessages =async(e) =>{
              e.preventDefault();
              socket.emit("stop typing", chatId);
              try {
                    dispatch(messageStart())
                    const {data} =await axios.post("http://localhost:3001/api/message/"+chatId,{
                          content:messages
                    },config)
                    socket.emit("new message",data)
                    dispatch(messageSuccess([...allmessage,data]))
              } catch (error) {
                    dispatch(messageError()) 
                    console.log(error);
              }
              setMessages("")             
            }

            useEffect(() => {
                  const getChats = async() =>{
                      try {
                          dispatch(chatStart())
                          const {data}= await axios.get("http://localhost:3001/api/chat",config);
                          dispatch(chatSuccess(data))
                      } catch (error) {
                          dispatch(chatError())
                      }
                  };
                  getChats();
               
              },[])
          useEffect(() => {
            socket.on("message recieved",(newMessage) =>{
                  dispatch(messageStart())
                  if(!selectedChatCompare || selectedChatCompare._id === newMessage.chat._id){
                        // notification
                        dispatch(messageError())
                  }
                  else{
                        dispatch(messageSuccess([...allmessage,newMessage]))
                  }
                  
            })
      })
      
          useEffect(() => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
          }, [setMessages,chatId,sendMessages]);
       
  return (
    <>
         <Navbar/>
{/* For only PC */}

<div className="md:flex md:flex-row h-[calc(100vh-2.5rem)] hidden" >
<div className='md:w-2/5 border bg-slate-100'>
            <div className='flex items-center rounded-md mt-1 ml-3 p-1'>
                  <input className=' w-4/5  h-12  rounded-md p-3' type="text" placeholder='Search your friend '></input>
                  <i className="fa-solid fa-xl fa-magnifying-glass my-6 ml-7 cursor-pointer"></i>
                  <i className="fa-solid fa-xl fa-user-plus my-6 ml-4 cursor-pointer" onClick={handleFrenids} ></i>
            </div>
     <div className='conversations overflow-y-scroll border h-[calc(100vh-6.8rem)] '  >
                  {allChat?.map((c) =>(
                        <div className='individual-chat' key={c?._id} onClick={() =>{setCurrentChat(c)}} >
                        <Conversation name={c?.isGroupChat ? c?.chatname : c?.users[0]?._id === currentuser  ? c?.users[1]?.username :  c?.users[0]?.username  } id={c?._id} message={c?.latestMessage?.content} time={c?.latestMessage?.createdAt}  />
                        </div>

                  ))}
      </div>
</div>

{/* Write conversation and message together instead of getMessage */}
 {currentChat?   <div className=' md:w-3/5  md:flex md:flex-col md:justify-between'>
      <div className='preview '>
      <div className='flex bg-white rounded-lg border justify-between'>
            <div className='flex left'>
            <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            <h1 className='mt-2 capitalize text-primary'>{currentChat?.isGroupChat ? currentChat?.chatname : currentChat?.users[0]?._id === currentuser  ? currentChat?.users[1]?.username :  currentChat?.users[0]?.username  }</h1>
            </div> 
            <div className='right'>
            <i className="fa-solid fa-user-plus fa-xl mt-5 mr-3 text-navbar cursor-pointer"></i>
            </div>
           
      </div>
      <div className= 'messages overflow-y-scroll h-[calc(100vh-10.9rem)] bg-main'>
            {/* Messages */}
           
            {allmessage?.map((m) =>(
                   <div key={m?._id} ref={scrollRef}>
                  <Mesaages message={m}   />
                  </div>
            ))}  
            
      </div>
      {typing ? <div>Typing...</div>:<></>}
          <form className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg' onSubmit={sendMessages}>
          <input type="text" placeholder='Enter message' className='w-full h-10 rounded-lg p-5 border' value={messages} onChange={typingHandler}/>
           <button><i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400" ></i></button> 
          </form>
          </div>
          </div>:<NopPreview/>} 
         {getFreinds && <div className='border  m-auto bg-secondary left-2/4  fixed  w-80 z-30 rounded-lg'>
                <div className='flex'>
                <div className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg'>
          <input type="text" placeholder='Group name' className='w-full h-10 rounded-lg p-5 border'/>
          </div>
                      <i className="fa-solid fa-xmark fa-2xl mt-10 mr-2 cursor-pointer" onClick={handleFrenids}></i>
                </div>
                <div className=' h-70 overflow-y-scroll'>
                      {/* Search freinds */}
                      {/* {allUsers?.map((u) =>(
                        <SearchFreinds name={u.username}  key={u._id} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  joined={u.updatedAt} />
                  ))} */}
          </div>
          <div >
                <button className='border mb-3 ml-2 rounded-lg w-14 h-10 bg-navbar text-main hover:w-20 hover:h-8'>Create</button>          
         </div>
          </div>}
</div>

{/* For only modile phone */}

<div className='lg:hidden md:hidden xl:hidden 2xl:hidden'>
 <div className="md:flex md:flex-row h-[calc(100vh-2.5rem)]" >
   {!visible ?  <div className='md:w-2/5 border bg-slate-200'>
            <div className='flex items-center rounded-md mt-1 ml-3 p-1'>
                  <input className=' w-4/5  h-12  rounded-md p-3' type="text" placeholder='Search your friend '></input>
                  <i className="fa-solid fa-xl fa-magnifying-glass my-6 ml-4 cursor-pointer"></i>
                  <i className="fa-solid fa-xl fa-user-plus my-6 ml-3 cursor-pointer" onClick={handleFrenids} ></i>
            </div>
     {!getFreinds ?<div className='conversations overflow-y-scroll border h-[calc(100vh-6.8rem)] '>
           {/* Conversations */}
           {/* {allChat?.map((c) =>(
                        // console.log(c._id),
                        <Conversation name={c?.chatname}  key={c?._id} id={c?._id} message={c?.latestMessage?.content} time={c?.latestMessage?.createdAt} />
                  ))} */}

      </div>:<div className='border  m-auto bg-secondary w-80 z-30 rounded-lg'>
                <div className='flex'>
                <div className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg'>
          <input type="text" placeholder='Group name' className='w-full h-10 rounded-lg p-5 border'/>
          </div>
                      <i className="fa-solid fa-xmark fa-2xl mt-10 mr-2 cursor-pointer" onClick={handleFrenids}></i>
                </div>
                <div className=' h-70 overflow-y-scroll'>
                      {/* Search freinds */}
                      {/* {allUsers?.map((u) =>(
                        <SearchFreinds name={u.username} key={u._id} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  joined={u.updatedAt} />
                  ))} */}
          </div>
          <div >
                <button className='border mb-3 ml-2 mt-3 rounded-lg w-14 h-7 bg-orange-500 text-white hover:w-20 hover:h-8'>Create</button>          
         </div>
          </div>}
</div>:<GetMessages setVisible={setVisible}/>
}
</div>   

</div>











   </>
  )
}

export default Chats