import React from 'react'

function SearchFreinds({name,profile,joined}) {
  return (
      <div className='flex border justify-between  m-2 rounded-md bg-white'>
        <div className='flex'>
        <img className='w-10 h-10 rounded-full mt-2 mr-3 ml-3 border border-navbar' src={profile} alt='image'/>
      <div className='flex flex-col' >
            <h1 className='capitalize mt-3 text-primary'>{name}</h1>
      </div>
      </div>

      <div className='mr-4 mt-3'> 
                  <h1 className='capitalize mt-4 text-secondary text-xs'>Joined:{new Date(joined).toDateString()}</h1>
      </div>
</div>
  )
}

export default SearchFreinds