import React, { useEffect } from 'react'
import ExploreMore from '../ExploreMore'
import Navbar from '../Navbar'
import Followers from '../Followers'
import { useDispatch, useSelector } from 'react-redux'
import { postError, postStart, postSuccess } from '../../redux/Slice/postSlice'
import axios from 'axios'
import Cookie from "js-cookie"
function Explore() {

  const dispatch = useDispatch()
  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get('token')}`
    }
  }
  const {allpost} = useSelector(state =>state.post)
  // const {allpost} = useSelector(state =>state.post)
  // console.log(allpost);

useEffect(() => {
  const getAllPost = async() =>{
    try {
      dispatch(postStart())
      const {data} = await axios.get("http://localhost:3001/api/post",config)
      dispatch(postSuccess(data))
      // console.log(data);
    } catch (error) {
      dispatch(postError())
    }
  }
  getAllPost()
  
},[] )
  

  return (
    
    <>
    <Navbar/>
    <div className='flex '>
      <div className='left flex-1 h-[calc(100vh-2.5rem)] overflow-y-scroll border  md:p-5 '>
        {allpost?.map((p) =>(
        <ExploreMore key={p._id} name={"leander"} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} liked={"10"} message={"this are messages"} caption={"This is caption"} count={"6"} likecount={"3"} likename={"aadil"} />
        ))}

        {/* <ExploreMore name={"shiv"} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} liked={"10"} message={"this are messages"} caption={"This is caption"} count={"63"} likecount={"23"} likename={"shiv"} />
        <ExploreMore name={"riya"} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} content={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixnspHe2fobVRIxfj7VFzeLlMSfjxZwGtNQ&usqp=CAU"} liked={"10"} message={"this are messages"} caption={"This is caption"} count={"46"} likecount={"83"} likename={"lance"}/> */}
      </div>
      <div className='right hidden md:flex h-[calc(100vh-2.5rem)] overflow-y-scroll p-6 md:flex-col '>
        <h1 className='mt-4 mb-4 font-mono'>Who is following you </h1>
        <Followers profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} username={"Aadil"} date={"23-4-2022"} follows={false}/>
        <Followers profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} username={"shiv"} date={"10-2-2022"} follows={true}/>
      </div>
    </div>
    </>
  )
}

export default Explore