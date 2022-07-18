import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMessageError, getMessageStart, getMessageSuccess, messageError, messageStart, messageSuccess } from '../redux/Slice/messageSlice';
import Mesaages from './Mesaages';
import Cookies from "js-cookie"

function GetMessages() {
      const [messages, setMessages] = useState("")
      const dispatch = useDispatch()

      const {allmessage} = useSelector(state => state.message)
      const {currentUser} = useSelector(state => state.user)
      const {chatId} = useParams();

      const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${Cookies?.get("token")}`
            }
          }

          useEffect(() => {
            const getMessages = async() =>{
                try {
                  dispatch(messageStart())
                  const {data}= await axios.get(`http://localhost:3001/api/message/get/${chatId}`,config);
                  dispatch(messageSuccess(data))

                } catch (error) {
                     dispatch(messageError()) 
                    console.log(error);
                }
            };
            getMessages();
         
        },chatId,setMessages)

        const sendMessages =async(e) =>{
            e.preventDefault();
            try {
                  dispatch(getMessageStart())
                  const {data} =await axios.post("http://localhost:3001/api/message/"+chatId,{
                        content:messages
                  },config)
                  dispatch(getMessageSuccess(data))
            } catch (error) {
                  dispatch(getMessageError()) 
                  console.log(error);
            }
            
            setMessages("")
           
        }
     console.log(allmessage);


  return (
      <div className=' md:w-3/5  md:flex md:flex-col md:justify-between'>
      <div className='preview '>
      <div className='flex bg-white rounded-lg border justify-between'>
            <div className='flex left'>
            <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            {/* <h1 className='mt-2 capitalize text-primary'>{grp.chatname?grp.chatname:chat.username}</h1> */}
            </div> 
            <div className='right'>
            <i className="fa-solid fa-user-plus fa-xl mt-5 mr-3 text-navbar cursor-pointer"></i>
            </div>
           
      </div>
      <div className= 'messages overflow-y-scroll h-[calc(100vh-10.9rem)] bg-main'>
            {/* Messages */}
            {allmessage?.map((m) =>(
                  <Mesaages key={m?._id} image={m?.sender?.profile} name={m?.sender?.username} own={m?.sender?._id === currentUser?._id?true:false} message={m.content} date={m.createdAt} />
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