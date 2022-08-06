import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import Cookie from "js-cookie"  

function SearchFreind({search}) {

      
      
  return (
      <div className='flex p-2 border items-center border-x-0 border-t-0'>
      <Link to={"/profile/"+search._id}><img src={search.profile} className="rounded-full h-8 w-8 cursor-pointer"/></Link>
            <div className="ml-2">
                  <div className="">{search.username}</div>
            </div>  
      </div>
  )
}

export default SearchFreind