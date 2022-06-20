import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'

function Login() {
  return (
    <>
    <Navbar/>
      <div className="flex justify-center h-[calc(100vh-2.5rem)] w-screen bg-gradient-to-r from-cyan-300 to-blue-700 " >
      <div className='right flex justify-center items-center '>
            <div className='flex w-80 bg-white rounded-lg lg:w-[766px] md:w-[600px] md:justify-center md:mt-[80px] lg:mt-[50px] '>
                  <div className='flex flex-col w-full p-5'>
                        <h1 className='text-slate-300 text-xl '>Start for free</h1>
                        <h1 className='text-2xl mt-2 mb-2'>Sign up for InstaChat</h1>
                        <h2 className='text-slate-300'>New member? <Link className='text-secondary' to="/register">Register</Link></h2>

                        <div className='flex justify-center flex-col item-center mt-4'>
                              <label className='mb-2'>Username</label>
                                 <input className='w-full mb-3 h-12 rounded-md p-3 bg-slate-100' type="text" placeholder='Username'/>
                              <label className='mb-2'>Password</label>
                                 <input className='w-full h-12 mb-4 rounded-md p-3 bg-slate-100' type="text" placeholder='Password '/>
                                 <button className='bg-primary text-white rounded-lg  w-full h-10 hover:bg-blue-500'>Login</button>
                                 <div className=' bg-slate-200  flex mt-4 rounded-lg hover:bg-slate-100 hover:border '>
                                 <i className="fa-brands text-primary fa-2xl fa-google-plus-g m-auto pl-2"></i>
                                 <button className=' w-full h-10'>Sign up with google</button>
                                 </div>
                        </div>
                  </div>
            </div>
      </div>
      </div>
    </>
  )
}

export default Login