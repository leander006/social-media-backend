const asyncHandler = require('express-async-handler');

const Comment = require('../model/Comment');
const Post = require('../model/Post');



const createComment = asyncHandler(async(req,res) =>{
      const post = await Post.findById(req.params.id)
      const {content} = req.body;
      if(!content)
      {
          return res.status(401).json("Please enter all  field");
      }   
      try {
          const newComment = new Comment({
              username:req.user._id,
              content:content,
              post:req.params.id,
          })
  
          const comment = await newComment.save();
          await post.updateOne({$push:{comments:comment._id}})
          res.status(200).json("Commented successfully ");
      } catch (error) {
          res.status(500).json({error:error.message});
             
      }
  
  })



// get all comments of particular user
const getComment = asyncHandler(async(req,res) =>{
      
      try {
            const comment = await Comment.find({}).populate("username").populate("post").sort({createdAt:-1});
            return res.status(200).json(comment)
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
      

})

//Particular comment
const getParticularComment = asyncHandler(async(req,res) =>{
      try {
            const comment = await Comment.findById(req.params.id).populate("username").populate("post").sort({createdAt:-1});
            return res.status(200).json(comment)
          
      } catch (error) {
            return res.status(500).send({error:error.message})
      }
      

})

const deleteComment =asyncHandler(async(req,res) =>{

      const comment = await Comment.findById(req.params.id) 
      console.log(comment);
      const post = await Post.findById(comment.post)

      try {
            await Comment.findByIdAndDelete(req.params.id)
            await post.updateOne({$pull:{comments:comment.id}})
            res.status(200).json("Comment deleted successfully")
      } catch (error) {
           return res.status(500).send({error:error.message}) 
      }
})

  module.exports = {
	createComment,
      getComment,
      getParticularComment,
      deleteComment 
};
