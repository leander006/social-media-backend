import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import Cookie from "js-cookie"  
import axios from 'axios'
import { loginError, loginStart, loginSuccess } from '../redux/Slice/userSlice'



function ExploreMore({explore}) {
      const {currentUser} = useSelector(state =>state.user)
      const [like, setLike] = useState(explore?.likes?.length)
      const [isLiked, setIsLiked] = useState(explore.likes?.includes(currentUser._id))
      const [bookmark, setBookmark] = useState(explore.bookmark?.includes(currentUser._id))
      const dispatch = useDispatch()

      const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${Cookie.get('token')}`
            }
          }

          const handleLikes =async(e) =>{
            e.preventDefault()
            try {
                  dispatch(loginStart())
                  const {data}=await axios.put(`http://localhost:3001/api/post/likePost/${explore._id}`,{},config)
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
                  const {data}= await axios.put(`http://localhost:3001/api/post/bookmarkPost/${explore?._id}`,{},config)
                  dispatch(loginSuccess(data))
                  setBookmark(!bookmark)
            } catch (error) {
                  dispatch(loginError())
                  console.log(error?.response?.data);
            }
      }
          
          useEffect(() => {
            setIsLiked(currentUser?.others?currentUser.others?.likedPost?.includes(explore._id):currentUser.likedPost?.includes(explore._id) );
            setBookmark(currentUser?.others?currentUser?.others?.bookmarkedPost?.includes(explore._id):currentUser.bookmarkedPost?.includes(explore._id) );
          }, [explore._id,currentUser])



      

  return (
        <>
   <div className='flex flex-col w-screen md:w-[59%]   lg:w-[65%] xl:w-[49%] bg-[#455175] md:mt-4 my-3' >
          <div className='flex p-1 items-center' >
                  <Link to={"/profile/"+explore?.owner?._id}><img src={explore?.owner?.profile} alt='image' className='w-10 h-10  rounded-full cursor-pointer border'/></Link>
                  <Link to={"/profile/"+explore?.owner?._id}><h1 className='capitalize ml-2 font-sans cursor-pointer text-white' >{explore?.owner?.username}</h1></Link>
          </div>
          <div className='flex justify-center'>
          <Link to={"/singlePage/"+explore?._id}><img src={explore?.content} className= 'object-contain cursor-pointer w-screen lg:w-[100vw]' alt='image'/></Link>
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
                       <Link to={"/singlePage/"+explore?._id}><div>
                              <i className="fa-regular fa-2xl fa-comment cursor-pointer" ></i>
                              <h1>{explore?.comments?.length}</h1>
                        </div></Link> 
                        
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

export default ExploreMore