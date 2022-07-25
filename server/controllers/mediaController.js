
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
            const user = await User.findById(req.user._id)  
            if(!post.likes.includes(req.user._id)){
                  const newPost=await post.updateOne({$push:{likes:req.user._id}})
                  await user.updateOne({$push:{likedPost:req.params.id}})
                  console.log(newPost);
                  return res.status(200).json("Liked post")
                 
            }
            else{
                  await post.updateOne({$pull:{likes:req.user._id}})
                  await user.updateOne({$pull:{likedPost:req.params.id}})
                  return res.status(200).json("Unliked post") 
            }
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
})

const bookmark = asyncHandler(async(req,res) =>{
      try {
            const post = await Post.findById(req.params.id)
            const user = await User.findById(req.user._id)  
            if(!post.bookmarked.includes(req.user._id)){
                  const newPost=await post.updateOne({$push:{bookmarked:req.user._id}})
                  await user.updateOne({$push:{bookmarkedPost:req.params.id}})
                  console.log(newPost);
                  return res.status(200).json("Bookmarked post")
                 
            }
            else{
                  await post.updateOne({$pull:{bookmarked:req.user._id}})
                  await user.updateOne({$pull:{bookmarkedPost:req.params.id}})
                  return res.status(200).json("Bookmarked post") 
            }
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
})

module.exports = {
	follow,
      unfollow,
      like,
      bookmark 
};