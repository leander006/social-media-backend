const asyncHandler = require('express-async-handler');
const Comment = require('../model/Comment');
const Post = require('../model/Post');



const createPost = asyncHandler(async(req,res) =>{

      const {content,caption} = req.body;
  
      if(!content || !caption)
      {
          return res.status(401).json("Please enter all  field");
      }   
      try {
          const newPost = new Post({
              owner:req.user._id,
              content:content,
              caption:caption,
          })
  
          const post = await newPost.save();
          res.status(200).json(post);
      } catch (error) {
          res.status(500).json({error:error.message});
             
      }
  
  })

const particularPost = asyncHandler(async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id).populate("owner").populate({path:"likes",populate:{path:"username"}}).populate({path:"comments",populate:{path:"username"}})
        res.status(200).json(post)
    } catch (error) {
        res.status(404).send({error:error.message})
    }
})

// Get all post
const getPost = asyncHandler(async(req,res) =>{
      try {
            const post = await Post.find({}).populate("owner").populate({path:"likes",populate:{path:"username"}}).populate({path:"comments",populate:{path:"username"}}).sort({createdAt:-1})
            res.status(200).json(post)
      } catch (error) {
            res.status(404).send({error:error.message})
      }

})

// Delete post
const deletePost = asyncHandler(async(req,res) =>{
    const post = await Post.findById(req.params.id)
    const comment = await Comment.find({post:post._id})
    try {
        await Post.findByIdAndDelete(req.params.id)
        // await Comment.findByIdAndDelete(comment._id)
        return res.status(200).json("Deleted successfully");
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
})



module.exports = {
	createPost,
    getPost,
    particularPost,
    deletePost
};