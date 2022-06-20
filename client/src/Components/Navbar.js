import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {

      const [visible, setVisible] = useState(false);
      const handleVisibility = (e) =>{
            e.preventDefault();
            setVisible(!visible);
      }
  return (
    <div className='container'>

         <div className='container'>
          <div className='upper w-screen flex bg-purple-700 justify-between h-10 items-center'>
            <div className='flex items-center '>
                  <i className="fa-solid fa-angles-right my-5 mx-2 cursor-pointer sm:fa-2xl" onClick={handleVisibility}></i>
                 <p className='my-4 text-sm sm:text-xl md:text-xl' >Instachat</p>
            </div>
            <div className='flex items-center bg-gray-100 h-8 rounded-md ml-1'>
                  <input className='w-40 h-8 rounded-md p-3 md:w-80' type="text" placeholder='what you want to search '></input>
                  <i className="fa-solid fa-xl fa-magnifying-glass my-6 ml-2 cursor-pointer"></i>
            </div>
            <div className='flex items-center '>
                  <i className="fa-solid fa-2xl fa-plus my-5  mr-3 cursor-pointer"></i>
                  <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            </div>
          </div>
      </div>
      <div className={visible?'bg-purple-500 w-40 top-0 left-0 flex flex-col h-screen justify-between fixed z-50 lg:w-60 2xl:w-30':'hidden'}>
      <div className='flex items-center justify-between'>
                 <i className="fa-solid fa-angles-left my-3 mx-2 cursor-pointer lg:fa-2xl" onClick={handleVisibility} ></i>
                 <p className='mr-12 md:7xl' >Instachat</p>
            </div>
            <div className='flex items-center justify-center'>
            <ul className='flex flex-col space-y-7'>
                  <Link className='cursor-pointer' to="/">Home</Link>
                  <Link className='cursor-pointer' to="/explore">Explore</Link>
                  <Link className='cursor-pointer' to="/chat">Chats</Link>
                  <Link className='cursor-pointer' to="/">Your post</Link>
                  <Link className='cursor-pointer' to="/">Liked post</Link>
                  <Link className='cursor-pointer' to="/">Followers</Link>
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
