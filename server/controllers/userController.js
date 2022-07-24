const User = require("../model/User");
const asyncHandler = require('express-async-handler');
const Post = require("../model/Post")
const Message= require("../model/Message");

const particularUser = asyncHandler(async(req,res) =>{
      const {name} = req.query
      
      try {
            const keyword = req.query.name
            
            const users = await User.find({username:{$regex:keyword ,$options:'$i'}})
            console.log(users.length);
            if(users.length !== 0){
                  return res.status(200).json(users)
            }
            
            return res.status(404).send({error:"User doest not exist"});
 
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})


// get all user //

const allUser = asyncHandler(async(req,res) =>{
      try {
           const allUsers = await User.find({_id:{$ne:req.user._id}})
           return res.status(200).json(allUsers)
      } catch (error) {
            return res.status(500).send({error:error.message})
      }

})

// delete

const remove = asyncHandler(async(req,res) =>{
      try {
       
           const post = await Post.find({owner:req.user._id})
           console.log(post);
           const message = await Message.find({owner:req.user._id})
           console.log(message);
           await User.findByIdAndDelete(req.user._id)
      //      await post.findByIdAndDelete()
           return res.status(200).json("User deleted successfully");

      } catch (error) {
            return res.status(500).send({error:error.message})
      }

})
// To get users for adding inside group chat//

const groupUser =asyncHandler(async(req,res) =>{
      try {
       
          
            const allUsers = await User.find({_id:{$ne:req.user._id}})
             return res.status(200).json(allUsers);
 
 
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})
//get login user
const loginUser =asyncHandler(async(req,res) =>{
      try {
       
          
            const users = await User.findOne({_id:{$eq:req.user._id}})
             return res.status(200).json(users);
 
 
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})

// Update user //

const updateUser =asyncHandler(async(req,res) =>{
      // console.log(req.file);

      try {
            const user = await User.findByIdAndUpdate(req.user._id,
                 {     
                       name:req.body.name,
                       bio:req.body.bio,
                       username:req.body.username,
                       status:req.body.status,
                       profile:process.env.content+req.file.path
                 },
            { new: true })

            return res.status(200).json(user)
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})
module.exports = {
	allUser,
      particularUser,
      remove,
      groupUser,
      updateUser,
      loginUser
};