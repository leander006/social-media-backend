import React, { useState } from 'react'
import Cookie from "js-cookie"  
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { chatError, chatStart, chatSuccess } from '../redux/Slice/chatSlice';

function DirectMessage({search,visi, setVisi}) {

  const {allChat} = useSelector(state => state.chat)
  const dispatch = useDispatch()
  const config ={
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${Cookie.get('token')}`
      }
    }

  const openChat = async(e) =>{
        e.preventDefault()
        try {
          dispatch(chatStart())
          const {data} = await axios.post("http://localhost:3001/api/chat/"+search._id,{},config)
          if(typeof(data) === "string"){
            setVisi(!visi)
            return 
          }
          dispatch(chatSuccess([data,...allChat,]))
          setVisi(!visi)
      } catch (error) {
          dispatch(chatError())
          console.log(error);
      }
  }

  return (
    <>
    <div className='flex bg-slate-300 p-2 cursor-pointer' onClick={openChat}>
    <img src={search.profile} className="rounded-full h-10 w-10"/>
          <div className="flex-1 md:ml-2 md:mt-2">
                <div className="h-3 ">{search.username}</div>
          </div>  
    </div>
  
</>
  )
}

export default DirectMessage