import React from 'react'

function Mesaages({message,own}) {
  return (
    <div className={own?'flex flex-col':'flex flex-col items-end mr-4'}>
          <div className='flex mt-2'>
          <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
          <p className={own?'bg-green-500 xs:text-xs break-words overflow-hidden rounded-lg p-1 w-52':'bg-teal-700 break-words overflow-hidden  xs:text-xs rounded-lg p-1 w-52'}>{message}</p>
          </div>
          <h3 className={own?'text-blue-400  ml-11':'text-blue-400  mr-32'}>3 mins ago</h3>
    </div>
  )
}

export default Mesaages