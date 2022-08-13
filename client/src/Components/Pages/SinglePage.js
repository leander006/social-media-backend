import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import Comment from '../Comment'
import Navbar from '../Navbar'
import Cookie from "js-cookie"  
import axios from 'axios'
import SingleSkeleton from '../Skeleton/SingleSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { loginError, loginStart, loginSuccess } from '../../redux/Slice/userSlice'
import { commentError, commentStart, commentSuccess } from '../../redux/Slice/commentSlice'
import { SpinnerCircular } from 'spinners-react'
import { postError, postStart, postSuccess } from '../../redux/Slice/postSlice'

function SinglePage() {

      const {postId} = useParams()
      const [post, setPost] = useState()
      const {currentUser} = useSelector(state =>state.user)
      const {allComment} = useSelector(state =>state.comment)
      const {allpost} = useSelector(state =>state.post)
      const [isLiked, setIsLiked] = useState()
      const [bookmark, setBookmark] = useState()
      const [comment, setComment] = useState("")
      const [loading, setLoading] = useState(false)
      const [like, setLike] = useState()
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const config ={
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${Cookie.get('token')}`
        }
      }
  useEffect(() => {
    const getPost = async() =>{
      try {
        const {data} = await axios.get("http://localhost:3001/api/post/"+postId,config)
        setPost(data)
        setLoading(true)
      } catch (error) {
          console.log(error?.response?.data);
      }
    }
    getPost()
  },[currentUser])

          useEffect(() => {
            setLike(post?.likes?.length)
            setIsLiked(currentUser.likedPost?.includes(postId));
            setBookmark(currentUser.bookmarkedPost?.includes(postId) );
          }, [post?.likes,currentUser,postId])
   
          const handleLikes =async(e) =>{
            e.preventDefault()
            try {
              dispatch(loginStart())
                  const {data}=await axios.put(`http://localhost:3001/api/post/likePost/${postId}`,{},config)
                  dispatch(loginSuccess(data))
                  setLike(isLiked ? like - 1 : like + 1);
                  setIsLiked(!isLiked)
            } catch (error) {
                  dispatch(loginError())
                  console.log(error?.response?.data);
            }
      }   
             
      const handleSaved =async(e) =>{
            e.preventDefault()
            try {
                  dispatch(loginStart())
                  const {data}=await axios.put(`http://localhost:3001/api/post/bookmarkPost/${postId}`,{},config)
                  dispatch(loginSuccess(data))
            } catch (error) {
                  dispatch(loginError())
                  console.log(error?.response?.data);
            }
      }

      const handleDelete =async(e) =>{
        e.preventDefault()
        try {
              dispatch(postStart())
              const {data}=await axios.delete(`http://localhost:3001/api/post/delete/${postId}`,config)
              dispatch(postSuccess(allpost))
              navigate("/home")
        } catch (error) {
              dispatch(postError())
              console.log(error?.response?.data);
        }
    }
      
      const click = () =>{
        navigate("/profile/"+post?.owner?._id)
  }
      useEffect(() => {
        const getCommet = async() =>{
          try {
            dispatch(commentStart())
            const {data} = await axios.get("http://localhost:3001/api/comment/allComment/"+postId,config)
            dispatch(commentSuccess(data))
          } catch (error) {
            dispatch(commentError())
              console.log(error?.response?.data);
          }
        }
        getCommet()
      },[postId,post?.comments]) 
      const handleComment =async(e) =>{
        e.preventDefault()
        try {
              dispatch(commentStart())
              const {data}=await axios.post(`http://localhost:3001/api/comment/${postId}`,{content:comment},config)
              dispatch(commentSuccess([data,...allComment]))
              setComment("")
        } catch (error) {
              dispatch(commentError())
              console.log(error?.response?.data);
        }
  }
   

  return (
      <>
      <Navbar/>
        <div className='flex bg-[#2D3B58] pt-9'>
         {loading? <div className='flex flex-col py-4 lg:items-center lg:justify-center lg:p-4 lg:flex-row h-[calc(100vh-2.3rem)] md:h-[calc(100vh-2.3rem)] w-screen lg:h-[calc(100vh-2.7rem)] overflow-y-scroll'>
              <div className='h-2/5 lg:h-5/6 lg:border border-[#BED7F8] border-x-0 border-y-0 w-screen lg:w-2/5'>
                        <img className='h-full w-screen object-contain' src={post?.content}></img>
              </div>
              <div className='flex flex-col justify-between lg:border border-[#BED7F8] p-2 h-3/5 lg:h-5/6 lg:w-2/5  '>
                  <div className='flex p-1 flex-col justify-between h-64' >
                        <div className='flex'>
                          <div className='flex p-1 mt-1 basis-20 lg:basis-14 rounded-full' >
                            <img src={post?.owner?.profile} alt='image' className='rounded-full h-fit cursor-pointer' onClick={click}/>
                        </div>
                        <div className='main basis-10/12'>
                            <h1 className='capitalize ml-2 font-sans cursor-pointer font-bold text-white' onClick={click}>{post?.owner?.username}</h1>
                            <p className='ml-2 mt-3 text-slate-300'>{post?.caption}</p>
                        </div>
                        {post?.owner?._id === currentUser?._id && <div onClick={handleDelete}>
                            <i className="fa-solid text-white fa-xl fa-trash-can cursor-pointer"></i>
                        </div>}
                  {/* </div>
                  
                  <div className='flex my-3 mx-3 text-white items-center' > */}
                  </div>
                  <div className='flex pl-3'>
                <div className='flex items-center' >
                      <div className='flex likes cursor-pointer flex-col justify-center mt-3' onClick={handleLikes}>
                      {isLiked?
                              <i className="fa-solid fa-heart fa-2xl pr-3 text-red-700"/>: 
                              <i className="fa-regular fa-heart fa-2xl pr-3"/>
                              }
                              <h1 className='mt-3 ml-3'>{like}</h1>
                      </div>
                </div>
                 <div className='mb-6 cursor-pointer'>
                 { bookmark ?<i className="fa-solid fa-xl fa-bookmark cursor-pointer" onClick={handleSaved}></i>:
                        <i className="fa-regular fa-xl fa-bookmark cursor-pointer" onClick={handleSaved}></i>}
                </div>             
                </div>
                </div>
                 {allComment.length ===0 ?<div className='border-x-0 flex items-center justify-center border-t-2 border-[#BED7F8]  h-3/5 lg:h-5/6  border-b-0 overflow-y-scroll'>
                        <h1 className='text-slate-400'>No Comments</h1>
                  </div>:
                  <div className='border-x-0 border-t-2 border-[#BED7F8] border-b-0 overflow-y-scroll'>
                 {allComment?.map((c)=>(
                      <Comment key={c._id} comment={c}/>
                      
                 ))} 
                  </div>}
                
                  <div className='flex items-center bg-[#455175] rounded-md'>
                        <input className='w-full rounded-md p-1' value={comment} placeholder='Comment here' onChange={e=>setComment(e.target.value)}  type="text"></input>
                        <i className="fa-solid fa-xl fa-paper-plane p-2 text-[#BED7F8] cursor-pointer " onClick={handleComment}></i>
                  </div>
            </div>
          </div>:
          <SingleSkeleton/>}
        </div>
      </>
  )
}

export default SinglePage