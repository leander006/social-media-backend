import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ExploreAll({name,profile,content,time,image}) {
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

      const redirect =(e)=>{
            e.preventDefault()
            navigate("/singlepage")
      }
  return (
      <div className='flex flex-col w-screen md:w-[49%] p-2 lg:w-[45%] xl:w-[33%] bg-[#455175] md:mt-4 my-3' >
      <div className='flex p-1 items-center' >
            <img src={profile} alt='image' className='w-10 h-10  rounded-full cursor-pointer border' onClick={redirect}/>
              <h1 className='capitalize ml-2 font-sans cursor-pointer text-white' onClick={redirect}>{name}</h1>
      </div>
      <div className='flex justify-center'>
      <img src={content} className= 'object-contain cursor-pointer w-full' alt='image' onClick={redirect} />
      </div>
      <div className='flex my-3 mx-3 items-center justify-between' >
            <div className='flex likes cursor-pointer items-center' onClick={handleLikes}>
                  <div className='flex flex-col justify-center mt-3'>
                          {!likes ? <i className="fa-regular fa-heart fa-2xl pr-3"/>:
                          <i className="fa-solid fa-heart fa-2xl pr-3 text-red-700"/>
                          }
                          <h1 className='mt-3 ml-1'>23</h1>
                  </div>
                    <div>
                          <i className="fa-regular fa-2xl fa-comment cursor-pointer" onClick={redirect}></i>
                          <h1>23</h1>
                    </div>
                    
            </div>
             <div>
                    {saved ?<i className="fa-solid fa-xl fa-bookmark" onClick={handleSaved}></i>:
                    <i className="fa-regular fa-xl fa-bookmark" onClick={handleSaved}></i>}
            </div>             
            
      </div>
   
</div>
  )
}

export default ExploreAll