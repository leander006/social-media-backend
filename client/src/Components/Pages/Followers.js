import React from 'react'

function Followers({profile,username,date,follows}) {
  return (
    <div className='flex h-12 mb-3 border-b-2'>
      <div className='flex  '  >
        <div className='left'>
        <img src={profile} alt='image' className='w-10 h-10 rounded-full mr-3 border border-purple-400 '/>
        </div>
        <div className='right'>
        <h1 className='text-gray-400'>{username}</h1>
        <h1 className='text-purple-500'>Joined on {date}</h1>
        </div>
      </div>
      <div className='btn'>
           {follows ?<h1 className='text-yellow-500'>Following</h1> :<button className='bg-yellow-500 w-20 rounded-md hover:bg-yellow-300'>Follow</button>}
      </div>

    </div>
  )
}

export default Followers