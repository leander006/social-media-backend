import React, { useState } from 'react'
import Conversation from '../Conversation'
import Mesaages from '../Mesaages'
import Navbar from '../Navbar'
import NopPreview from '../NopPreview'
import SearchFreinds from '../SearchFreinds'

function Chats() {
      const [visible, setVisible] = useState(false)
      const [getFreinds, setGetFreinds] = useState(false)

      const handleVisibility =(e) =>{
            e.preventDefault();
            setVisible(true);

      }
      const handleFrenids =(e) =>{
            e.preventDefault();
            setGetFreinds(!getFreinds);
      }
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
     <div className='conversations overflow-y-scroll border h-[calc(100vh-6.8rem)] ' onClick={handleVisibility} >
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"leander"} message={"op"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"Shiv"} message={"i am op"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"phandu"} message={"i am noob"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"lance"} message={"i am gando"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"phandu"} message={"i am noob"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"lance"} message={"i am gando"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>   
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>   
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>   
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"phandu"} message={"i am noob"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"lance"} message={"i am gando"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>
      </div>
</div>

 {visible ?<div className=' md:w-3/5  md:flex md:flex-col md:justify-between'>
      <div className='preview '>
      <div className='flex bg-white rounded-lg border'>
            <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            <h1 className='mt-2 capitalize'>name</h1>
      </div>
      <div className= 'messages overflow-y-scroll h-[calc(100vh-10.9rem)]'>
            {/* Messages */}
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
      </div>
          <div className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg'>
          <input type="text" placeholder='Enter message' className='w-full h-10 rounded-lg p-5 border'/>
            <i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400"></i>
          </div>
          </div>
          </div>:<NopPreview/>} 
         {getFreinds && <div className='border  m-auto bg-purple-500 left-2/4  fixed  w-80 z-30 rounded-lg'>
                <div className='flex'>
                <div className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg'>
          <input type="text" placeholder='Group name' className='w-full h-10 rounded-lg p-5 border'/>
          </div>
                      <i className="fa-solid fa-xmark fa-2xl mt-10 mr-2 cursor-pointer" onClick={handleFrenids}></i>
                </div>
                <div className=' h-80 overflow-y-scroll'>
                      {/* Search freinds */}
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} name={"leander"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   name={"aadil"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"shiv"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"lance"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"phandu"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"devraj"}/>
          </div>
          <div >
                <button className='border mb-3 ml-2 mt-3 rounded-lg w-14 h-7 bg-orange-500 text-white hover:w-20 hover:h-8'>Create</button>          
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
     {!getFreinds ?<div className='conversations overflow-y-scroll border h-[calc(100vh-6.8rem)] ' onClick={handleVisibility}>
           {/* Conversations */}
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"Shiv"} message={"i am op"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"phandu"} message={"i am noob"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"lance"} message={"i am gando"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"phandu"} message={"i am noob"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"lance"} message={"i am gando"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>   
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>   
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>   
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"aadil"} message={"helo daddy"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"phandu"} message={"i am noob"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"lance"} message={"i am gando"} time={"2 hours ago"}/>
            <Conversation image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"darsh"} message={"haa pata hai"}time={"2 hours ago"}/>
      </div>:<div className='border  m-auto bg-purple-500 w-80 z-30 rounded-lg'>
                <div className='flex'>
                <div className='flex bg-slate-200 h-16 items-center p-2 m-3 mt-3 rounded-lg'>
          <input type="text" placeholder='Group name' className='w-full h-10 rounded-lg p-5 border'/>
          </div>
                      <i className="fa-solid fa-xmark fa-2xl mt-10 mr-2 cursor-pointer" onClick={handleFrenids}></i>
                </div>
                <div className=' h-80 overflow-y-scroll'>
                      {/* Search freinds */}
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"} name={"leander"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   name={"aadil"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"shiv"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"lance"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"phandu"}/>
          <SearchFreinds image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}  name={"devraj"}/>
          </div>
          <div >
                <button className='border mb-3 ml-2 mt-3 rounded-lg w-14 h-7 bg-orange-500 text-white hover:w-20 hover:h-8'>Create</button>          
         </div>
          </div>}
</div>:
<div className=' md:w-3/5  md:flex md:flex-col md:justify-between'>
      <div className='preview '>
      <div className='flex bg-white rounded-lg border'>
            <img className='w-7 h-7 rounded-full mt-2 mb-2 mr-3 ml-3' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU' alt='image'/>
            <h1 className='mt-2 capitalize'>name</h1>
      </div>
      <div className= 'messages overflow-y-scroll h-[calc(100vh-10.2rem)]'>
            {/* messages */}
            <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSB8icZLgdz4veJ2ZtLg30cYRDEWPPpj0L6Q&usqp=CAU"}   own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
         
      </div>
          <div className='flex bg-slate-200 h-16 items-center p-3 mt-3 rounded-lg'>
          <input type="text" placeholder='Enter message' className='w-full h-10 rounded-lg p-2 border'/>
            <i className="fa-solid fa-paper-plane fa-xl p-2 cursor-pointer hover:text-slate-400"></i>
          </div>
          </div>
      
          </div>}
</div>   

</div>











   </>
  )
}

export default Chats