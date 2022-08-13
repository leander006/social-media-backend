import React, { useState } from 'react'
import {format} from "timeago.js"
import Cookie from "js-cookie"  
import { useDispatch, useSelector } from 'react-redux'
import { messageError, messageStart, messageSuccess } from '../redux/Slice/messageSlice';
import axios from 'axios';
function Mesaages({messages,own,setMessage}) {
  const {allmessage} = useSelector(state =>state.message);
  const {currentChat} = useSelector(state => state.chat)
  const {currentUser} = useSelector(state =>state.user)
  const dispatch = useDispatch();
  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get('token')}`
    }
  }
  const [visible, setVisible] = useState(false)
  const handleDelete =async(e) =>{
    e.preventDefault()
    try {
          dispatch(messageStart())
          await axios.delete(`http://localhost:3001/api/message/delete/${messages._id}`,config)
          dispatch(messageSuccess((allmessage.filter((m)  => m._id !== messages._id))))
          setMessage(" ")
    } catch (error) {
          dispatch(messageError)
          console.log(error?.response?.data);
    }
}
  return (
      <div className={own?'flex justify-end':'flex justify-start'}>
          <div className='flex flex-col mt-2 w-fit'>
            <div className='flex items-center'>
            <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src={messages?.sender?.profile} alt='image'/>
            <h1 className='text-[#2D3B58]'>{messages?.sender?.username}</h1>
            <p className='text-slate-900 ml-2 '>{format(messages?.createdAt)}</p>
            </div>
          <div className='flex' onMouseEnter={() =>{setVisible(true)}} onMouseLeave={() =>{setVisible(false)}}>
                 <p className='pl-2 text-[#2D3B58]'  >{messages?.content}</p>
                 {visible && <div  className=''>
                  <i className={messages?.sender?._id === currentUser._id ?"fa-solid fa-xl ml-2 fa-trash-can cursor-pointer":""} onClick={handleDelete}></i>
                  </div>}
          </div>

          </div>
      </div>

  )
}

export default Mesaages