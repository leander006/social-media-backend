import React, { useState } from 'react'
import {format} from "timeago.js"
import Cookie from "js-cookie"  
import { useDispatch, useSelector } from 'react-redux'
import { messageError, messageStart, messageSuccess } from '../redux/Slice/messageSlice';
import axios from 'axios';
function Mesaages({message,own}) {
  const {allmessage} = useSelector(state =>state.message);
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
          await axios.delete(`http://localhost:3001/api/message/delete/${message._id}`,config)
          dispatch(messageSuccess((allmessage.filter((m)  => m._id !== message._id))))
    } catch (error) {
          dispatch(messageError)
          console.log(error?.response?.data);
    }
}
  return (
      <div className={own?'flex justify-end':'flex justify-start'}>
          <div className='flex flex-col mt-2 w-fit'>
            <div className='flex items-center'>
            <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src={message?.sender?.profile} alt='image'/>
            <h1 className='text-[#2D3B58]'>{message?.sender?.username}</h1>
            <p className='text-slate-900 ml-2 '>{format(message?.createdAt)}</p>
            </div>
          <div className='flex' onMouseEnter={() =>{setVisible(true)}} onMouseLeave={() =>{setVisible(false)}}>
                 <p className='pl-2 text-[#2D3B58] cursor-pointer'  >{message?.content}</p>
                 {visible && <div  className=''>
                  <i className="fa-solid fa-xl ml-2 fa-trash-can cursor-pointer" onClick={handleDelete}></i>
                  </div>}
          </div>

          </div>
      </div>

  )
}

export default Mesaages