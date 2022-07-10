import React, { useState } from 'react'

function SearchFreinds({name,profile,joined}) {
  const [loading, setloading] = useState(false)
  return (
<div class="border border-blue-300 shadow rounded-md bg-white my-3 max-w-sm w-full mx-auto">
  <div class={loading?"animate-pulse flex space-x-4":"flex space-x-4"}>

  <img className='w-10 h-10 rounded-full mt-2 mr-3 ml-3 border border-navbar' src={profile} alt='image'/>

    <div class="flex-1 space-y-3">
    <h1 className='capitalize text-primary'>{name}</h1>
        <h1 className='capitalize  text-secondary text-xs'>Joined:{new Date(joined).toDateString()}</h1>
    </div>
  </div>
</div>

  )
}

export default SearchFreinds