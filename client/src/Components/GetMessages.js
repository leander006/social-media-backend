import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Mesaages from './Mesaages';

function GetMessages({setVisible}) {
      const [message, setMessage] = useState([])
      const [messages, setMessages] = useState("")
      const [chat, setChat] = useState({})
      const [grp, setGrp] = useState({})
      const {chatId} = useParams();
      const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
            }
          }
      useEffect(() => {
            const getMessages = async() =>{
          
                try {
                    
                  const res= await axios.get("http://localhost:3001/api/message/get/"+chatId,config);
                  // console.log(res.data[0].chat);
                  setMessage(res.data);

                  setChat(res?.data[0]?.chat?.users[1])
                  setGrp(res?.data[0]?.chat)
                  // setVisible(false)
                } catch (error) {
                      
                    console.log(error);
                }
            };
            getMessages();
         
        },[])

        const sendMessages =async(e) =>{
            e.preventDefault();
            try {
                  const {data} =await axios.post("http://localhost:3001/api/message/"+chatId,{
                        content:messages
                  },config)
                  setMessage([...message,data])
            } catch (error) {
                  console.log(error);
            }
            
            setMessages("")
           
        }
        const back =(e) =>{
            e.preventDefault();
            setVisible(false)
        }

        console.log(message);
  return (
      <div className=' md:w-3/5  md:flex md:flex-col md:justify-between'>
      <div className='preview '>
      <div className='flex bg-white rounded-lg border justify-between'>
            <div className='flex left'>
            <i className="fa-solid fa-arrow-left fa-2xl text-navbar mt-5 ml-2 cursor-pointer" onClick={back}></i>
            <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            <h1 className='mt-2 capitalize text-primary'>{grp.chatname?grp.chatname:chat.username}</h1>
            </div> 
            <div className='right'>
            <i className="fa-solid fa-user-plus fa-xl mt-5 mr-3 text-navbar cursor-pointer"></i>
            </div>
           
      </div>
      <div className= 'messages overflow-y-scroll h-[calc(100vh-10.9rem)] bg-main'>
            {/* Messages */}
            {message?.map((m) =>(
                  <Mesaages key={m?._id}  image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={m?.sender?._id === JSON.parse(localStorage.getItem("userInfo"))?.others?._id }  message={m?.content} />
            ))}  
      </div>
          <form className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg' onSubmit={sendMessages}>
          <input type="text" placeholder='Enter message' className='w-full h-10 rounded-lg p-5 border' value={messages} onChange={e=>setMessages(e.target.value)}/>
           <button><i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400" ></i></button> 
          </form>
          </div>
          </div>
  )
}

export default GetMessages