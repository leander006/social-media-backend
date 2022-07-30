import React from 'react'
import { Link } from 'react-router-dom';

function SearchFreind({search}) {
      
  return (
      <div className='flex bg-slate-300 p-2'>
      <Link to={"/profile/"+search._id}><img src={search.profile} className="rounded-full h-10 w-10 cursor-pointer"/></Link>
            <div className="flex-1 md:ml-2 md:mt-2">
                  <div className="h-3 ">{search.username}</div>
            </div>  
      </div>
  )
}

export default SearchFreind