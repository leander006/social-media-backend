import React from 'react'
import {format} from "timeago.js"

function Mesaages({message}) {

  return (
          <div className='flex flex-col mt-2'>
            <div className='flex '>
            <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src={message?.sender?.profile?message?.sender?.profile:"/noProfile.jpeg"} alt='image'/>
            <h1 className='mt-2 text-purple-600'>{message?.sender?.username}</h1>
            <h3 className='text-slate-400 ml-2 mt-2'>{format(message?.createdAt)}</h3>
            </div>

          <div className='flex'>
          <p className={'xs:text-xs ml-12 break-words capitalize overflow-hidden p-1 w-34'}>{message?.content}</p>
          </div>
          </div>

  )
}

export default Mesaages