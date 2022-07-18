import React from 'react'
import { Link } from 'react-router-dom'

function Conversation({name,message,id}) {
      
    
      
  return (
      
            <Link to={`/message/${id}`}>
                  <div className='flex border justify-between m-2 rounded-md bg-white cursor-pointer'>

            <div className='flex justify-end'>
                  <div>
                  <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3 ml-3 border border-main' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU" alt='image'/>
                  </div>

            <div className='flex flex-col' >
                  <h1 className='capitalize text-slate-600'>{name}</h1>
                  <h1 className='capitalize text-primary' >{message}</h1>
            </div>
            {/* <div className='mt-3'> 
                  <h1 className='capitalize text-secondary'>{new Date(time).toDateString()}</h1>
            </div> */}
            </div>
            
      </div>
      </Link>
      
  )
}

export default Conversation