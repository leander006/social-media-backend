import React from 'react'
import {format} from "timeago.js"

function Mesaages({message,own}) {
  return (
      <div className={own?'flex justify-end':'flex justify-start'}>
          <div className='flex flex-col mt-2 w-fit'>
            <div className='flex items-center'>
            <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src={message?.sender?.profile} alt='image'/>
            <h1 className='text-[#2D3B58]'>{message?.sender?.username}</h1>
            <h3 className='text-slate-900 ml-2 '>{format(message?.createdAt)}</h3>
            </div>
          <div className='w-52 break-all pl-2  text-[#2D3B58]'>
                  {message?.content}
                  </div>

          </div>
      </div>

  )
}

export default Mesaages