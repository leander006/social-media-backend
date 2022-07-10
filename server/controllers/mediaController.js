
const asyncHandler = require('express-async-handler');

const Post = require('../model/Post');
const User = require('../model/User');

//Add followers //
const follow = asyncHandler(async(req,res) =>{
      try {
            const user = await User.findById(req.params.id)   
            const currentUser = req.user;
            if(!user.followers.includes(req.user._id)){

                  await user.updateOne({$push:{followers:req.user._id}})
                  await currentUser.updateOne({$push:{following:req.params.id}})
                  return res.status(200).json("Follower added successfully")
                 
            }
            else{
                  return res.status(403).send({error:"Already following"})  
            }
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
})
//Remove followers //
const unfollow = asyncHandler(async(req,res) =>{
      try {
            const user = await User.findById(req.params.id)   
            const currentUser = req.user;
            if(currentUser.following.length === 0){
                  return res.status(402).send({error:"You don't follow anyone"})
            }
            if(user.followers.includes(req.user._id)){
                  await user.updateOne({$pull:{followers:req.user._id}})
                  await currentUser.updateOne({$pull:{following:req.params.id}})
                  return res.status(200).json("Follower removed successfully")
                 
            }
            else{
                  return res.status(403).send({error:"You are not following"})  
            }
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
})

//Like post //


const like = asyncHandler(async(req,res) =>{
      try {
            const post = await Post.findById(req.params.id)
    
            if(!post.likes.includes(req.user._id)){
                  const newPost=await post.updateOne({$push:{likes:req.user._id}})
                  console.log(newPost);
                  return res.status(200).json("Liked post")
                 
            }
            else{
                  return res.status(403).send({error:"Already liked"})  
            }
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
})


// Unlike post //

const unLike = asyncHandler(async(req,res) =>{
      try {
            const post = await Post.findById(req.params.id)   
            if(post.likes.includes(req.user._id)){
                  await post.updateOne({$pull:{likes:req.user._id}})
                  return res.status(200).json("Unliked post")
            }
            else{
                  return res.status(403).send({error:"Already unliked"})  
            }
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
})

module.exports = {
	follow,
      unfollow,
      like,
      unLike
};