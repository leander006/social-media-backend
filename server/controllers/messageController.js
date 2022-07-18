const asyncHandler = require('express-async-handler');
const Chat = require('../model/Chat');
const Message = require('../model/Message');
const User = require('../model/User');


// send message//
const sendMessage = asyncHandler(async(req,res) =>{
      const chatId = req.params.chatId
      const content = req.body.content
      if(!chatId){
            return res.status(404).send("Nothing selected")
      }
      var newMessage = {
            sender:req.user._id,
            content,
            chat:chatId
      }
      try {
            var message = await Message.create(newMessage)
            message = await message.populate("sender","username profile")
            message =await message.populate("chat")
            message = await User.populate(message,{
                  path:"chat.users",
                  select:"username profile"
            })

            await Chat.findByIdAndUpdate(chatId,{
                  latestMessage:message
            });
            return res.status(200).json(message)
      } catch (error) {
            return res.json(500).send({message:error.message})
      }
      
})

// Get all message//

const allMessages = asyncHandler(async(req,res) =>{
      const chatId = req.params.chatId
      if(chatId === "undefined"){
            return 
      }
      if(!req.user._id)
      {
          return res.status(401).send({error:"First login"}) 
      }
      if(!chatId ){
            return res.status(404).send({message:"Nothing is selected"})
      }

      try {
            var message= await Message.find({chat:chatId})
            .populate("sender","username profile")
            .populate("chat")
            message = await User.populate(message,{
                  path:"chat.users",
                  select:"username profile"
            })
            message = await User.populate(message,{
                  path:"chat.users",
                  select:"username profile"
            })

            return res.status(200).json(message)
      } catch (error) {
            return res.status(500).send({message:error.message})
      }
})
module.exports = {
	sendMessage,
      allMessages
};