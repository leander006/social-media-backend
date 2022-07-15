import React, { useEffect, useState } from 'react'
import Conversation from '../Conversation'
import Mesaages from '../Mesaages'
import Navbar from '../Navbar'
import NopPreview from '../NopPreview'
import SearchFreinds from '../SearchFreinds'

import GetMessages from '../GetMessages'
import { useSelector } from 'react-redux'
import axios from 'axios'
function Chats() {
 
      const [getFreinds, setGetFreinds] = useState(false)
      const [currentChat, setCurrentChat] = useState(null)
      const [visible, setVisible] = useState(false)
      const [chats, setChats] = useState([])
      const [allUsers, setAllUsers] = useState([])
      const {currentUser} = useSelector(state =>state.user)
      const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${currentUser?.token}`
            }
          }
      const handleFrenids =(e) =>{
            e.preventDefault();
            setGetFreinds(!getFreinds);
      }
      // useEffect(() => {
      //       const getChats = async() =>{
          
      //           try {
                    
      //               const res= await axios.get("http://localhost:3001/api/user",config);
      //                   // setChats(res.data);

      //               console.log(res);
      //           } catch (error) {
      //               console.log(error);
      //           }
      //       };
      //       getChats();
         
      //   },[])

        useEffect(() => {
            const getAllUsers = async() =>{
          
                try {
                    
                  const res= await axios.get("http://localhost:3001/api/user",config);
                  setAllUsers(res.data);
                  
                } catch (error) {
                    console.log(error);
                }
            };
            getAllUsers();
         
        },[])


      //   console.log(allUsers);

      
  return (
    <>
         <Navbar/>
{/* For only PC */}

<div className="md:flex md:flex-row h-[calc(100vh-2.5rem)] hidden" >
<div className='md:w-2/5 border bg-slate-100'>
            <div className='flex items-center rounded-md mt-1 ml-3 p-1'>
                  <input className=' w-4/5  h-12  rounded-md p-3' type="text" placeholder='Search your friend '></input>
                  <i className="fa-solid fa-xl fa-magnifying-glass my-6 ml-7 cursor-pointer"></i>
                  <i className="fa-solid fa-xl fa-user-plus my-6 ml-4 cursor-pointer" onClick={handleFrenids} ></i>
            </div>
     <div className='conversations overflow-y-scroll border h-[calc(100vh-6.8rem)] '  >
                  {chats?.map((c) =>(
                        // console.log(c?.isGroupChat?c?.chatname:c?.users[0].username)
                        <div className='individual-chat' onClick={() =>{setCurrentChat(c)}} >
                        <Conversation name={c?.chatname}  key={c?._id} id={c?._id} message={c?.latestMessage?.content} time={c?.latestMessage?.createdAt} />
                        </div>

                  ))}
      </div>
</div>
{/* Write conversation and message together instead of getMessage */}
 {currentChat?<GetMessages setVisible={setVisible}/>:<NopPreview/>} 
         {getFreinds && <div className='border  m-auto bg-secondary left-2/4  fixed  w-80 z-30 rounded-lg'>
                <div className='flex'>
                <div className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg'>
          <input type="text" placeholder='Group name' className='w-full h-10 rounded-lg p-5 border'/>
          </div>
                      <i className="fa-solid fa-xmark fa-2xl mt-10 mr-2 cursor-pointer" onClick={handleFrenids}></i>
                </div>
                <div className=' h-70 overflow-y-scroll'>
                      {/* Search freinds */}
                      {allUsers?.map((u) =>(
                        <SearchFreinds name={u.username}  key={u._id} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  joined={u.updatedAt} />
                  ))}
          </div>
          <div >
                <button className='border mb-3 ml-2 rounded-lg w-14 h-10 bg-navbar text-main hover:w-20 hover:h-8'>Create</button>          
         </div>
          </div>}
</div>

{/* For only modile phone */}

<div className='lg:hidden md:hidden xl:hidden 2xl:hidden'>
 <div className="md:flex md:flex-row h-[calc(100vh-2.5rem)]" >
   {!visible ?  <div className='md:w-2/5 border bg-slate-200'>
            <div className='flex items-center rounded-md mt-1 ml-3 p-1'>
                  <input className=' w-4/5  h-12  rounded-md p-3' type="text" placeholder='Search your friend '></input>
                  <i className="fa-solid fa-xl fa-magnifying-glass my-6 ml-4 cursor-pointer"></i>
                  <i className="fa-solid fa-xl fa-user-plus my-6 ml-3 cursor-pointer" onClick={handleFrenids} ></i>
            </div>
     {!getFreinds ?<div className='conversations overflow-y-scroll border h-[calc(100vh-6.8rem)] '>
           {/* Conversations */}
           {chats?.map((c) =>(
                        // console.log(c._id),
                        <Conversation name={c?.chatname}  key={c?._id} id={c?._id} message={c?.latestMessage?.content} time={c?.latestMessage?.createdAt} />
                  ))}

      </div>:<div className='border  m-auto bg-secondary w-80 z-30 rounded-lg'>
                <div className='flex'>
                <div className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg'>
          <input type="text" placeholder='Group name' className='w-full h-10 rounded-lg p-5 border'/>
          </div>
                      <i className="fa-solid fa-xmark fa-2xl mt-10 mr-2 cursor-pointer" onClick={handleFrenids}></i>
                </div>
                <div className=' h-70 overflow-y-scroll'>
                      {/* Search freinds */}
                      {allUsers?.map((u) =>(
                        <SearchFreinds name={u.username} key={u._id} profile={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  joined={u.updatedAt} />
                  ))}
          </div>
          <div >
                <button className='border mb-3 ml-2 mt-3 rounded-lg w-14 h-7 bg-orange-500 text-white hover:w-20 hover:h-8'>Create</button>          
         </div>
          </div>}
</div>:<GetMessages setVisible={setVisible}/>
}
</div>   

</div>











   </>
  )
}

export default Chats