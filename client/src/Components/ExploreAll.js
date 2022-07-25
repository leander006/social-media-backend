import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function ExploreAll({exploreAll}) {
      const [likes, setLikes] = useState(false)
      const [saved, setSaved] = useState(false)
      const navigate = useNavigate();
      const handleLikes =(e) =>{
            e.preventDefault()
            setLikes(!likes)
      }

      const handleSaved =(e) =>{
            e.preventDefault()
            setSaved(!saved)
      }


  return (
        <>
      <div className='flex flex-col w-screen md:w-[49%] p-2 lg:w-[45%] xl:w-[43%] bg-[#455175] md:mt-4 my-3' >
      <div className='flex p-1 items-center' >
            <Link to={"/profile/"+exploreAll?.owner?._id}><img src={exploreAll?.owner?.profile} alt='image' className='w-10 h-10  rounded-full cursor-pointer border'/></Link>
            <Link to={"/profile/"+exploreAll?.owner?._id}><h1 className='capitalize ml-2 font-sans cursor-pointer text-white' >{exploreAll?.owner?.name}</h1></Link>
      </div>
      <div className='flex justify-center'>
      <Link to={"/singlePage/"+exploreAll?._id}><img src={exploreAll?.content} className= 'object-contain w-screen cursor-pointer ' alt='image' /></Link>
      </div>
      <div className='flex my-3 mx-3 items-center justify-between' >
            <div className='flex likes cursor-pointer items-center' onClick={handleLikes}>
                  <div className='flex flex-col justify-center mt-3'>
                          {!likes ? <i className="fa-regular fa-heart fa-2xl pr-3"/>:
                          <i className="fa-solid fa-heart fa-2xl pr-3 text-red-700"/>
                          }
                          <h1 className='mt-3 ml-1'>{exploreAll?.likes?.length}</h1>
                  </div>
                    <div>
                        <Link to={"/singlePage/"+exploreAll?._id}><i className="fa-regular fa-2xl fa-comment cursor-pointer" ></i></Link>  
                        <h1>{exploreAll?.comments?.length}</h1>
                    </div>
                    
            </div>
             <div>
                    {saved ?<i className="fa-solid fa-xl fa-bookmark cursor-pointer" onClick={handleSaved}></i>:
                    <i className="fa-regular fa-xl fa-bookmark cursor-pointer" onClick={handleSaved}></i>}
            </div>             
            
      </div>
   
</div>
</>
  )
}

export default ExploreAll