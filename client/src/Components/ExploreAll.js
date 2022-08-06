import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import Cookie from "js-cookie"  
import axios from 'axios';
import { clicked, loginError, loginStart, loginSuccess } from '../redux/Slice/userSlice';

function ExploreAll({exploreAll}) {
      const {currentUser} = useSelector(state =>state.user)
      const [like, setLike] = useState(exploreAll?.likes?.length)
      const [isLiked, setIsLiked] = useState(exploreAll.likes?.includes(currentUser._id))
      const [bookmark, setBookmark] = useState(exploreAll.bookmark?.includes(currentUser._id))
      const dispatch = useDispatch()
      const navigage = useNavigate();
      const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${Cookie.get('token')}`
            }
          }
          const click = () =>{

                dispatch(clicked())
                navigage("/profile/"+exploreAll?.owner?._id)
          }
          useEffect(() => {
            setIsLiked(currentUser?.others?currentUser.others?.likedPost?.includes(exploreAll._id):currentUser.likedPost?.includes(exploreAll._id) );
          }, [exploreAll.likes,exploreAll._id,currentUser])
   
          useEffect(() => {
            setBookmark(currentUser?.others?currentUser?.others?.bookmarkedPost?.includes(exploreAll._id):currentUser.bookmarkedPost?.includes(exploreAll._id) );
          }, [exploreAll.bookmark,exploreAll._id,currentUser])

          const handleLikes =async(e) =>{
            e.preventDefault()
            try {
                  dispatch(loginStart())
                  const {data}=await axios.put(`http://localhost:3001/api/post/likePost/${exploreAll._id}`,{},config)
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
                  const {data}= await axios.put(`http://localhost:3001/api/post/bookmarkPost/${exploreAll?._id}`,{},config)
                  dispatch(loginSuccess(data))
                  setBookmark(!bookmark)
            } catch (error) {
                  dispatch(loginError())
                  console.log(error?.response?.data);
            }
      }



  return (
        <>
      <div className='flex flex-col  lg:w-[45%] xl:w-[43%] mb-6 md:m-4 bg-[#455175] lg:mt-4 ' >
      <div className='flex p-1 items-center' >
            <img src={exploreAll?.owner?.profile} alt='image' className='w-10 h-10  rounded-full cursor-pointer border' onClick={click}/>
             <h1 className='capitalize ml-2 font-sans cursor-pointer text-white' onClick={click} >{exploreAll?.owner?.name}</h1>
      </div>
      <div className='flex justify-center'>
      <Link to={"/singlePage/"+exploreAll?._id}><img src={exploreAll?.content} className= 'object-cover w-screen cursor-pointer ' alt='image' /></Link>
      </div>
      <div className='flex my-3 mx-3 items-center justify-between' >
            <div className='flex likes cursor-pointer items-center' onClick={handleLikes}>
                  <div className='flex flex-col justify-center mt-3'>
                  {isLiked?
                              <i className="fa-solid fa-heart fa-2xl pr-3 text-red-700"/>: 
                              <i className="fa-regular fa-heart fa-2xl pr-3"/>
                              }
                          <h1 className='mt-3 ml-1'>{like}</h1>
                  </div>
                    <div>
                        <Link to={"/singlePage/"+exploreAll?._id}><i className="fa-regular fa-2xl fa-comment cursor-pointer" ></i></Link>  
                        <h1>{exploreAll?.comments?.length}</h1>
                    </div>
                    
            </div>
             <div>
             { bookmark ?<i className="fa-solid fa-xl fa-bookmark cursor-pointer" onClick={handleSaved}></i>:
                        <i className="fa-regular fa-xl fa-bookmark cursor-pointer" onClick={handleSaved}></i>}
            </div>             
            
      </div>
   
</div>
</>
  )
}

export default ExploreAll