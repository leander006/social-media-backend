import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { commentError, commentStart, commentSuccess } from '../redux/Slice/commentSlice'
import axios from 'axios'
import Cookie from "js-cookie"  

function Comment({comment}) {

  const [visible, setVisible] = useState(false)
  const {currentUser} = useSelector(state =>state.user)
  const dispatch = useDispatch()
  const {allComment} = useSelector(state =>state.comment)
  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get('token')}`
    }
  }

  const handledelete =async(e) =>{
    e.preventDefault()
    try {
          dispatch(commentStart())
          const {data}=await axios.delete(`http://localhost:3001/api/comment/delete/${comment._id}`,config)
          dispatch(commentSuccess(data))
    } catch (error) {
          dispatch(commentError())
          console.log(error?.response?.data);
    }
}

  return (
    <>
      <div className='flex items-center'>
      <div className='flex p-1 ' >
                        <img src={comment?.username?.profile} alt='image' className='w-9 h-9 rounded-full cursor-pointer border' />
                        <Link to="/profile"><h1 className='capitalize ml-2 mr-10 cursor-pointer text-white' >{comment?.username?.username}</h1></Link>
      </div>
      <div className='mt-1 text-white flex items-center text-sm break-all w-96 mb-4'>
          <h1 className={comment?.username?._id === currentUser._id ? 'cursor-pointer':''} onClick={() =>{setVisible(!visible)}} >{comment?.content}</h1>
          {visible && comment?.username?._id === currentUser._id && <h1 className='cursor-pointer mb-12 fixed z-40 bg-gray-300 rounded p-1' onClick={handledelete}>Delete comment</h1>}
     </div>
     
      </div>
    </>
  )
}

export default Comment