import React from 'react'

function Mesaages({message,own,image,date,name}) {

  return (
    <div className={own?'flex flex-col':'flex flex-col items-end mr-4'}>
      <div className='mt-2 text-purple-600'>{name}</div>
          <div className='flex mt-2'>
        {image &&  <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3 border border-navbar' src={image} alt='image'/>}
          <p className={own?'bg-slate-100 xs:text-xs border break-words capitalize overflow-hidden text-secondary rounded-lg p-1 w-52':'bg-primary text-white break-words overflow-hidden capitalize border xs:text-xs rounded-lg p-1 w-52'}>{message}</p>
          </div>
          <h3 className={own?'text-slate-400  ml-11':'text-slate-400  mr-32'}>{new Date(date).toDateString()}</h3>
    </div>
  )
}

export default Mesaages