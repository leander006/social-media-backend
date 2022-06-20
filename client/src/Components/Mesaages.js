import React from 'react'

function Mesaages({message,own,image}) {
  return (
    <div className={own?'flex flex-col':'flex flex-col items-end mr-4'}>
          <div className='flex mt-2'>
          <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3' src={image} alt='image'/>
          <p className={own?'bg-slate-200 xs:text-xs border break-words capitalize overflow-hidden rounded-lg p-1 w-52':'bg-purple-600 text-white break-words overflow-hidden capitalize border xs:text-xs rounded-lg p-1 w-52'}>{message}</p>
          </div>
          <h3 className={own?'text-slate-600  ml-11':'text-slate-600  mr-32'}>3 mins ago</h3>
    </div>
  )
}

export default Mesaages