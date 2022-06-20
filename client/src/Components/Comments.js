import React from 'react'

function Comments({profile,name,comment}) {
  return (
    <div className='flex flex-col mb-3 mt-2'>
          <div className='flex '>
         <img src={profile} alt='image' className='w-10 h-10 rounded-full mr-3 '/>
            <h1 className='capitalize mt-2'>{name}</h1>
          </div>
          <div className='capitalize mb-1 '>
                {comment}
          </div>

    </div>
  )
}

export default Comments