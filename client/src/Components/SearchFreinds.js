import React from 'react'

function SearchFreinds({name,image}) {
  return (
      <div className='flex border justify-between m-2 rounded-md bg-white'>
      <div className='flex'>
      <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3 ml-3' src={image} alt='image'/>
      <div className='flex flex-col' >
            <h1 className='capitalize mt-3'>{name}</h1>
            </div>
      </div>
</div>
  )
}

export default SearchFreinds