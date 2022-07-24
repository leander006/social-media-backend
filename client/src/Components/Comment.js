import React from 'react'
import { Link } from 'react-router-dom'

function Comment() {
  return (
    <>
      <div className='flex'>
      <div className='flex p-1 ' >
                        <img src='/images/noProfile.jpeg' alt='image' className='w-9 h-9 rounded-full cursor-pointer border' />
                        <Link to="/profile"><h1 className='capitalize ml-2  cursor-pointer text-white' >Leander</h1></Link>
      </div>
      <div className='ml-9 mt-1 text-white text-sm break-all w-96 mb-4'>
          <h1>messagemessage</h1>
     </div>
     
      </div>
    </>
  )
}

export default Comment