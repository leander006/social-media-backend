const User = require("../model/User");
const asyncHandler = require('express-async-handler');
const Post = require("../model/Post")
const Message= require("../model/Message")

//search users//

const particularUser = asyncHandler(async(req,res) =>{
      try {
            const keyword = req.query.name
            
            const users = await User.find({username:{$regex:keyword ,$options:'$i'}})
            return res.status(200).json(users);
 
       } catch (error) {
             return res.status(404).json({error:error.message})
       }
})


// get all user //

const allUser = asyncHandler(async(req,res) =>{
      try {
       
          
           const allUsers = await User.find({_id:{$ne:req.user._id}})

         

            return res.status(200).json(allUsers);


      } catch (error) {
            return res.status(404).json({error:error.message})
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
            return res.status(404).json({error:error.message})
      }

})
// To get users for adding inside group chat//

const groupUser =asyncHandler(async(req,res) =>{
      try {
       
          
            const allUsers = await User.find({_id:{$ne:req.user._id}})
             return res.status(200).json(allUsers);
 
 
       } catch (error) {
             return res.status(404).json({error:error.message})
       }
})

module.exports = {
	allUser,
      particularUser,
      remove,
      groupUser
      

};