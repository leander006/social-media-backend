import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link} from 'react-router-dom'


function ExploreMore({explore}) {
      const [likes, setLikes] = useState(false)
      const [saved, setSaved] = useState(false)

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
   <div className='flex flex-col w-screen md:w-[59%] p-2  lg:w-[65%] xl:w-[49%] bg-[#455175] md:mt-4 my-3' >
          <div className='flex p-1 items-center' >
                  <Link to={"/profile/"+explore?.owner?._id}><img src={explore?.owner?.profile} alt='image' className='w-10 h-10  rounded-full cursor-pointer border'/></Link>
                  <Link to={"/profile/"+explore?.owner?._id}><h1 className='capitalize ml-2 font-sans cursor-pointer text-white' >{explore?.owner?.username}</h1></Link>
          </div>
          <div className='flex justify-center'>
          <Link to={"/singlePage/"+explore?._id}><img src={explore?.content} className= 'object-contain cursor-pointer lg:w-[100vw]' alt='image'/></Link>
          </div>
          <div className='flex my-3 mx-3 items-center justify-between' >
                <div className='flex likes cursor-pointer items-center' onClick={handleLikes}>
                      <div className='flex flex-col justify-center mt-3'>
                              {!likes ? <i className="fa-regular fa-heart fa-2xl pr-3"/>:
                              <i className="fa-solid fa-heart fa-2xl pr-3 text-red-700"/>
                              }
                              <h1 className='mt-3 ml-1'>{explore?.likes?.length}</h1>
                      </div>
                       <Link to={"/singlePage/"+explore?._id}><div>
                              <i className="fa-regular fa-2xl fa-comment cursor-pointer" ></i>
                              <h1>{explore?.comments?.length}</h1>
                        </div></Link> 
                        
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

export default ExploreMore