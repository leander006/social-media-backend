import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom'
import { loginError, loginStart, loginSuccess } from '../../redux/Slice/userSlice';
import Navbar from '../Navbar'
function Login() {

      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")
      const dispatch = useDispatch()
      const navigate = useNavigate()

      const handleSubmit = async(e) => {
            e.preventDefault();
            dispatch(loginStart())
            try {
              const {data} = await axios.post("http://localhost:3001/api/auth/login", {
                username,
                password,
              });
              dispatch(loginSuccess(data))
              navigate('/chat');
            } catch (err) {
             dispatch(loginError())
            }
          };

  return (
    <>
    <Navbar/>
      <div className="flex justify-center h-[calc(100vh-2.5rem)] w-screen bg-gradient-to-r from-cyan-300 to-blue-700 " >
      <div className='right flex justify-center items-center '>
            <div className='flex w-80 bg-white rounded-lg lg:w-[766px] md:w-[600px] md:justify-center md:mt-[80px] lg:mt-[50px] ' onSubmit={handleSubmit}>
                  <div className='flex flex-col w-full p-5'>
                        <h1 className='text-slate-300 text-xl '>Start for free</h1>
                        <h1 className='text-2xl mt-2 mb-2'>Sign up for InstaChat</h1>
                        <h2 className='text-slate-300'>New member? <Link className='text-secondary' to="/register">Register</Link></h2>

                        <form className='flex justify-center flex-col item-center mt-4' onSubmit={handleSubmit}>
                              <label className='mb-2'>Username</label>
                                 <input className='w-full mb-3 h-12 rounded-md p-3 bg-slate-100' onChange={e=>setUsername(e.target.value)} type="text" placeholder='Username'/>
                              <label className='mb-2'>Password</label>
                                 <input className='w-full h-12 mb-4 rounded-md p-3 bg-slate-100' onChange={e=>setPassword(e.target.value)} type="password" placeholder='Password '/>
                                 <button className='bg-primary text-white rounded-lg  w-full h-10 hover:bg-blue-500'>Login</button>
                        
                        </form>
                        <div className=' bg-slate-200  flex mt-4 rounded-lg hover:bg-slate-100 hover:border '>
                                 <i className="fa-brands text-primary fa-2xl fa-google-plus-g m-auto pl-2"></i>
                                 <button  className=' w-full h-10'>Sign up with google</button>
                                 </div>
                  </div>
            </div>
      </div>
      </div>
    </>
  )
}

export default Login