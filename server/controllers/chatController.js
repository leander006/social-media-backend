const asyncHandler = require('express-async-handler');
const User = require("../model/User")
const Chat = require("../model/Chat")
const accessChat = asyncHandler(async(req,res) =>{
      const userId = req.params.id;
            var isChat = await Chat.find({
                  isGroupChat:false,
                  $and:[
                        {users:{$elemMatch:{$eq:req.user._id}}},
                        {users:{$elemMatch:{$eq:userId}}}
                  ]
            }).populate("users","-password")
            .populate("latestMessage")

            isChat = await User.populate(isChat,{
                  path:"latestMessage.sender",
                  select:"name profile"
            })

            if(isChat.length>0){
                  return res.status(200).json(isChat[0])
            }

            try {
                  var ChatData ={
                        chatname:"sender",
                        isGroupChat:false,
                        users:[req.user._id,userId],

                  };
                  const chats = await Chat.create(ChatData);

                  const fullChat = await (await Chat.findOne({_id:chats._id})).populate("users","-password")
                  return res.status(200).json(fullChat)
            } catch (error) {
                  return res.status(500).json({error:error.message})
            }
      
})


module.exports = {
	accessChat

};