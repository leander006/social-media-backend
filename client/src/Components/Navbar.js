import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout} from '../redux/userSlice';
function Navbar() {

      const [visible, setVisible] = useState(false);
      const navigate = useNavigate()
      const dispatch = useDispatch();
      const handleVisibility = (e) =>{
            e.preventDefault();
            setVisible(!visible);
      }
      const log = (e)=>{
            e.preventDefault();
            dispatch(logout())
            navigate("/")
      }
  return (
    <div className='container'>

         <div className='container'>
          <div className='upper w-screen flex bg-navbar justify-between h-10 items-center'>
            <div className='flex items-center '>
                  <i className="fa-solid fa-angles-right my-5 mx-2 cursor-pointer sm:-2xl text-primary" onClick={handleVisibility}></i>
                 <p className='my-4 text-sm sm:text-xl md:text-xl text-primary' >Instachat</p>
            </div>
            <div className='flex items-center bg-gray-100 h-8 rounded-md ml-1'>
                  <input className='w-40 h-8 rounded-md p-3 md:w-80' type="text" placeholder='what you want to search '/>
                  <i className="fa-solid fa-xl fa-magnifying-glass my-6 ml-2 cursor-pointer text-primary"></i>
            </div>
            <div className='flex items-center '>
                  <i className="fa-solid fa-2xl fa-plus my-5  mr-3 cursor-pointer text-secondary"></i>
                  <img className='w-10 h-10 rounded-full mt-2 mb-2 mr-3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            </div>
          </div>
      </div>
      <div className={visible?'bg-navbar w-40 top-0 left-0 flex flex-col h-screen justify-between fixed z-50 lg:w-60 2xl:w-30':'hidden'}>
      <div className='flex items-center justify-between'>
                 <i className="fa-solid fa-angles-left my-3 mx-2 md:text-xl cursor-pointer  text-primary" onClick={handleVisibility} ></i>
                 <p className='mr-12 md:mr-36 md:text-xl  md:7xl text-primary' >Instachat</p>
            </div>
            <div className='flex items-center justify-center'>
            <ul className='flex flex-col space-y-7'>
                  <Link className='cursor-pointer text-secondary' to="/">Home</Link>
                  <Link className='cursor-pointer text-secondary' to="/explore">Explore</Link>
                  <Link className='cursor-pointer text-secondary' to="/chat">Chats</Link>
                  <Link className='cursor-pointer text-secondary' to="/">Your post</Link>
                  <Link className='cursor-pointer text-secondary' to="/">Liked post</Link>
                  <Link className='cursor-pointer text-secondary' to="/">Followers</Link>
            </ul>
            </div>
            <div className='flex items-center justify-evenly'>
                  <i className="fa-solid fa-2xl fa-arrow-right-from-bracket my-5 text-white-100 mr-3 cursor-pointer text-secondary" onClick={log}></i>
                  <img className='w-10 h-10 rounded-full mt-2 mb-2 cursor-pointer border border-secondary' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            </div>
      </div>
      
      </div>
  )
}

export default Navbar
