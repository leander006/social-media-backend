import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import Navbar from '../Navbar'
import SideBar from '../SideBar'
import Cookie from "js-cookie"
import axios from 'axios'



function Write() {

  const navigate = useNavigate()
  const [caption, setCaption] = useState("")
  const [selectedImg, setSelectedImg] = useState("")
  const [previewSource, setPreviewSource] = useState('');
  const [profile, setProfile] = useState()
  const [fileInputState, setFileInputState] = useState('');
  const config ={
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${Cookie.get("token")}`
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedImg(file);
    setFileInputState(e.target.value);
};

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
}

const handleImage = (e) => {
  e.preventDefault();
  if (!selectedImg) return;
  const reader = new FileReader();
  reader.readAsDataURL(selectedImg);
  reader.onloadend = () => {
      uploadImage(reader.result);
  };
  reader.onerror = () => {
      console.error('AHHHHHHHH!!');
  };
};

const uploadImage = async (base64EncodedImage) => {
  try {
     const {data}= await axios.post('http://localhost:3001/api/user/upload',{data: base64EncodedImage }
      ,config);
      setFileInputState('');
      setPreviewSource('');
      setProfile(data.url)
  } catch (err) {
      console.error(err);

  }
};


const handleSubmit = async(e) =>{
  e.preventDefault()
  try {
        const post = await axios.post("http://localhost:3001/api/post",{content:profile,caption:caption},config); 
        navigate("/home")

        }
        catch (error) {
              console.log(error?.response?.data);
        }
 
}

  return (
    <>
    <Navbar/>
      <div className='flex bg-[#2D3B58]'>
        <div>
          <SideBar/>
        </div>
        <form className='flex flex-col md:justify-center  md:m-auto w-screen h-[calc(100vh-4.3rem)] lg:w-[60%] md:w-[75%] md:h-[calc(100vh-2.7rem)]' onSubmit={handleSubmit}>
                <div className='flex justify-between p-4'>
                      <div className='flex items-center space-x-5'>
                            <i className="fa-solid fa-2xl fa-xmark cursor-pointer text-[#8aaaeb]" onClick={() => navigate("/home")}></i>
                            <h1 className='font-bold  text-xl text-[#8aaaeb]'>Post</h1>
                      </div>
                      <div>
                            <button type="submit"><i className="fa-solid fa-2xl cursor-pointer fa-check text-[#8aaaeb]" ></i></button>
                      </div>
                </div>

                <div className='flex flex-col justify-center items-center' >
                      <img className='image w-28 h-28 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 ' src={previewSource?previewSource:profile?profile:'/images/noImage.png'} alt='image'/>
                      <label className='text-[#8aaaeb] cursor-pointer font-bold text-2xl mt-2 hover:text-[#6795f1]' htmlFor='forFile'>Upload</label>
                      <input type="file" id='forFile' accept='image/png , image/jpg, image/jpeg ,video/mp4' value={fileInputState} onChange={handleFileInputChange}style={{display:"none"}}  name="file"/>
                </div>
                {selectedImg && <div className='flex justify-center'><h1 className='bg-blue-600 active:bg-blue-400 cursor-pointer mt-2 text-white p-1 rounded' onClick={handleImage}>Upload image</h1></div>}
                <div className='bottom'>
                      <div className='p-2'>
                            <h1 className='text-[#8aaaeb] '>Caption</h1>
                            <textarea className='bg-[#2D3B58] border-b w-full mt-2 outline-none' type="text" value={caption} onChange={e=>setCaption(e.target.value)} required></textarea>
                      </div>


                </div> 
                
              
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default Write