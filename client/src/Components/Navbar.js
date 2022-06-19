import React, { useState } from 'react'

function Navbar() {

      const [visible, setVisible] = useState(false);
      const handleVisibility = (e) =>{
            e.preventDefault();
            setVisible(!visible);
      }
  return (
    <div className='container'>
         <div className='container'>
          <div className='upper w-screen flex bg-slate-200 justify-between h-10 items-center'>
            <div className='flex items-center '>
                  <i className="fa-solid fa-angles-right my-5 mx-2 cursor-pointer sm:fa-2xl" onClick={handleVisibility}></i>
                 <p className='my-4' >Instachat</p>
            </div>
            <div className='flex items-center bg-gray-100 h-8 rounded-md '>
                  <input className='w-40 h-8 rounded-md p-3 md:w-80' type="text" placeholder='what you want to search '></input>
                  <i className="fa-solid fa-xl fa-magnifying-glass my-6 ml-2 cursor-pointer"></i>
            </div>
            <div className='flex items-center '>
                  <i className="fa-solid fa-2xl fa-plus my-5  mr-3 cursor-pointer"></i>
                  <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            </div>
          </div>
      </div>
      <div className={visible?'bg-slate-700 w-40 top-0 left-0 flex flex-col h-screen justify-between fixed z-1000 lg:w-60 2xl:w-30':'hidden'}>
      <div className='flex items-center justify-between'>
                 <i className="fa-solid fa-angles-left my-3 mx-2 cursor-pointer lg:fa-2xl" onClick={handleVisibility} ></i>
                 <p className='mr-12 md:7xl' >Instachat</p>
            </div>
            <div className='flex items-center justify-center'>
            <ul className='flex flex-col space-y-7'>
                  <li className='cursor-pointer'>Home</li>
                  <li className='cursor-pointer'>Explore</li>
                  <li className='cursor-pointer'>Chats</li>
                  <li className='cursor-pointer'>Your post</li>
                  <li className='cursor-pointer'>Liked post</li>
                  <li className='cursor-pointer'>Followers</li>
            </ul>
            </div>
            <div className='flex items-center justify-evenly'>
                  <i className="fa-solid fa-2xl fa-arrow-right-from-bracket my-5 text-white-100 mr-3 cursor-pointer"></i>
                  <img className='w-10 h-10 rounded-full mt-2 mb-2 cursor-pointer' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            </div>
      </div>
      </div>
  )
}

export default Navbar
