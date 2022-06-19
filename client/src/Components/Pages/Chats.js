import React, { useState } from 'react'
import Conversation from '../Conversation'
import Mesaages from '../Mesaages'
import Navbar from '../Navbar'

function Chats() {
      const [visible, setVisible] = useState(false)
      const handleVisibility =(e) =>{
            e.preventDefault();
            setVisible(!visible);

      }
  return (
    <>
         <Navbar/>
<div className="md:flex md:flex-row h-[calc(100vh-2.5rem)]" >
      <div className='conversations md:w-2/5 h-[cal(100vh-2.5rem)]  md:overflow-y-scroll bg-blue-700'>
            <Conversation name={"leander"} message={"op"}/>
            <Conversation name={"Shiv"} message={"i am op"}/>
            <Conversation name={"aadil"} message={"helo daddy"}/>
            <Conversation name={"phandu"} message={"i am noob"}/>
            <Conversation name={"lance"} message={"i am gando"}/>
            <Conversation name={"darsh"} message={"haa pata hai"}/>
            {/* <Conversation name={"leander"} message={"op"}/>
            <Conversation name={"Shiv"} message={"i am op"}/>
            <Conversation name={"aadil"} message={"helo daddy"}/>
            <Conversation name={"phandu"} message={"i am noob"}/>
            <Conversation name={"lance"} message={"i am gando"}/>
            <Conversation name={"darsh"} message={"haa pata hai"}/>

            <Conversation name={"leander"} message={"op"}/>
            <Conversation name={"Shiv"} message={"i am op"}/>
            <Conversation name={"aadil"} message={"helo daddy"}/>
            <Conversation name={"phandu"} message={"i am noob"}/>
            <Conversation name={"lance"} message={"i am gando"}/>
            <Conversation name={"darsh"} message={"haa pata hai"}/> */}
      </div>

      <div className='md:w-3/5  md:overflow-y-scroll h-[cal(100vh-2.5rem)] md:flex md:flex-col md:justify-between'>
      <div className= 'messages'>
          <Mesaages own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={false}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
          <Mesaages own={true}  message={"jfekrjekrbewfjwhefkjhekfherefkjhekfherefkjhekfherefkjhekfherifhkrfh"} />
      </div>
          <div className='flex bg-slate-500 h-8 items-center p-3 mt-3'>
          <input type="text" placeholder='Enter message' className='w-full h-6 rounded-lg p-2'/>
            <i className="fa-solid fa-paper-plane fa-xl p-2"></i>
          </div>
          </div>
</div>
   </>
  )
}

export default Chats