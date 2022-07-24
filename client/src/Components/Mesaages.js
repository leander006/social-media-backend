import React from 'react'
import {format} from "timeago.js"

function Mesaages({message}) {

  return (
          <div className='flex flex-col mt-2 w-fit  '>
            <div className='flex items-center'>
            <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src={message?.sender?.profile?message?.sender?.profile:"/images/noProfile.jpeg"} alt='image'/>
            <h1 className='text-[#BED7F8] md:text-[#2D3B58]'>{message?.sender?.username}</h1>
            <h3 className='text-white md:text-slate-900 ml-2 '>{format(message?.createdAt)}</h3>
            </div>
          <div className='w-full break-all pl-2 pr-2 md:text-[#2D3B58] text-[#BED7F8]'>
                  dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It 
                  </div>

          </div>

  )
}

export default Mesaages