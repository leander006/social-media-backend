import React from 'react'

function Conversation({name,message}) {
  return (
      <div className='flex border-b-2 border-black-600 '>
            <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3 ml-3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            <div className='flex flex-col' >
                  <h1>{name}</h1>
                  <h1>{message}</h1>
            </div>
      </div>
  )
}

export default Conversation