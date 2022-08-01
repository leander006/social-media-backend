const asyncHandler = require('express-async-handler');
const User = require("../model/User")
const Chat = require("../model/Chat")

// Create one-one chat//
const accessChat = asyncHandler(async(req,res) =>{
      const userId = req.params.id;
      const name = await User.findById(userId);
            var isChat = await Chat.find({
                  isGroupChat:false,
                  $and:[
                        {users:{$elemMatch:{$eq:req.user._id}}},
                        {users:{$elemMatch:{$eq:userId}}},
                        
                  ]
            }).populate("users","-password")
            .populate("latestMessage")

            isChat = await User.populate(isChat,{
                  path:"latestMessage.sender",
                  select:"username profile"
            })

            if(isChat.length>0){
                  return res.status(200).json({chat:isChat[0],res:"chats already exist cannot create new chat"})
            }

            try {
                  var ChatData ={
                        chatname:"sender",
                        isGroupChat:false,
                        users:[req.user._id,userId],

                  };
                  const chats = await Chat.create(ChatData);

                  const fullChat = await Chat.findOne({_id:chats._id}).populate("users","-password")
                  return res.status(200).send(fullChat)
            } catch (error) {
                  return res.status(500).send({error:error.message})
            }
      
})

// Get all chats//

const fetchChat = asyncHandler(async(req,res) =>{
      try {
      var chats = await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}) // regex//
      .populate("users","-password")
      .populate("groupAdmin","-password")
      .populate("latestMessage")
      .sort({updatedAt:-1})
      chats = await User.populate(chats,{
            path:"latestMessage.sender",
            select:"username profile"
      })
            
      res.status(200).send(chats)
            
      } catch (error) {
            res.status(500).json({message:"Start conversation with your friends"})
      }
                        
      })

      // Create group chat//

      const createGroupChat = asyncHandler(async(req,res) =>{
            if(!req.body.users || !req.body.name){
                  return res.status(400).send({message:"Please enter all feilds"})
            }
            var users = JSON.parse(req.body.users)
            if(users.length<2){
                  return res.status(400).send("More than 2 users must be seleted")
            }
            users.push(req.user)
            var isChat = await Chat.find({
                  isGroupChat:true,
                  chatname:req.body.name,
                  $and:[
                        {users:{$elemMatch:{$eq:req.user._id}}},
                        {users:{$elemMatch:{$eq:users.map((u) => u._id)}}},
                        
                  ]

            }).populate("users","-password")
            .populate("latestMessage")

            isChat = await User.populate(isChat,{
                  path:"latestMessage.sender",
                  select:"username profile"
            })

            if(isChat.length>0){
                  return res.status(200).json({chat:isChat[0],res:"chats already exist cannot create new chat"})
            }
            try {
                  const groupChat = await Chat.create({
                        chatname:req.body.name,
                        users:users,
                        isGroupChat:true,
                        groupAdmin:req.user,
                  })

                  const fullChat = await Chat.findOne({_id:groupChat._id})
                  .populate("users","-password")
                  .populate("groupAdmin","-password")
                  return res.status(200).send(fullChat)

            } catch (error) {
                  return res.status(505).send(error.message)
            }
      })
// Rename group chat //

const renameGroup = asyncHandler(async(req,res) =>{
      const chatname = req.body.chatname
      const chatId = req.params.id
      try {
            const updatedChat = await Chat.findByIdAndUpdate(chatId,{
                  chatname
            },
            {
                  new:true
            }
      )
            .populate("users","-password")
            .populate("groupAdmin","-password")
            return res.status(200).send(updatedChat) 
      } catch (error) {
            return res.status(404).send({message:error.message})
      }
})

//New member to group//

const addMember = asyncHandler(async(req,res) =>{
      const chatId = req.params.id
      const userId = req.body.userId
      try {
            const updatedChat = await Chat.findByIdAndUpdate(chatId,{
                   // regex//
                  $push:{users:userId},
            },
            {
                  new:true
            }
      )
            .populate("users","-password")
            .populate("groupAdmin","-password")
            return res.status(200).send(updatedChat) 
      } catch (error) {
            return res.status(404).send({message:error.message})
      }

})

// Remove member from group//

const removeMember = asyncHandler(async(req,res) =>{
      const chatId = req.params.id
      const userId = req.body.userId

      try {
            const removeChat = await Chat.findByIdAndUpdate(chatId,{
                  $pull:{users:userId},
            },
            {
                  new:true
            }
      )
            .populate("users","-password")
            .populate("groupAdmin","-password")
            return res.status(200).send(removeChat) 
      } catch (error) {
            return res.status(404).send({message:error.message})
      }
})
module.exports = {
	accessChat,
      fetchChat,
      createGroupChat,
      renameGroup,
      addMember,
      removeMember
};