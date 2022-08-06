const asyncHandler = require('express-async-handler');
const Comment = require('../model/Comment');
const Post = require('../model/Post');
const User = require('../model/User');


const createPost = asyncHandler(async(req,res) =>{
      const {caption} = req.body;
      try {
          const newPost = new Post({
              owner:req.user._id,
              caption:caption,
              content:req.body.content
        })
  
          const post = await newPost.save();
          await User.findByIdAndUpdate(
			req.user._id,
			{ $inc: { postCount: 1 } },
			{ new: true }
		);
          res.status(200).json(post);
      } catch (error) {
          res.status(500).json({error:error.message});
             
      }
  
})
// Get post by id
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
        await User.findByIdAndUpdate(
			req.user._id,
			{ $dec: { postCount: 1 } },
			{ new: true }
		);
        // await Comment.findByIdAndDelete(comment._id)
        return res.status(200).json("Deleted successfully");
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
})

//Get post of users and its followings//


const followingPost = asyncHandler(async(req,res) =>{
    try {
        const user = await User.findById(req.user._id)
        const post = await Post.find({owner:user._id}).populate("owner").populate({path:"likes",populate:{path:"username"}}).populate({path:"comments",populate:{path:"username"}}).sort({createdAt:-1})
        const following = user.following
// Promise.all is use to get all post of user's following login user

        const morePost = await Promise.all(
            following.map((id) =>{
                return Post.find({owner:id}).populate("owner").populate({path:"likes",populate:{path:"username"}}).populate({path:"comments",populate:{path:"username"}}).sort({createdAt:-1})
            })
        )

      
        const followerPost = post.concat(morePost.flat())
        console.log(followerPost);
// flat() is use to return json as a single object if not used it returned two object as [{},{}]

          res.status(200).json(followerPost)
    } catch (error) {
          res.status(404).send({error:error.message})
    }

})

// Post of like 
const likePost = asyncHandler(async(req,res) =>{
    try {
        const user = await User.findById(req.user._id)
        const likes = user.likedPost
// Promise.all is use to get all post of user's following login user
    const morePost = await Promise.all(
    likes.map((id) =>{
        return Post.find({_id:id}).populate("owner").populate({path:"likes",populate:{path:"username"}}).populate({path:"comments",populate:{path:"username"}}).sort({createdAt:-1})
    }))         
        res.status(200).json(morePost.flat())
    } catch (error) {
        res.status(404).send({error:error.message})
    }

})

const bookmarkPost = asyncHandler(async(req,res) =>{
    try {
        const user = await User.findById(req.user._id)
        const bookmark = user.bookmarkedPost
// Promise.all is use to get all post of user's following login user

const morePost = await Promise.all(
    bookmark.map((id) =>{
        return Post.find({_id:id}).populate("owner").populate({path:"likes",populate:{path:"username"}}).populate({path:"comments",populate:{path:"username"}}).sort({createdAt:-1})
    }))
        res.status(200).json(morePost.flat())
    } catch (error) {
        res.status(404).send({error:error.message})
    }

})



//Post of bookmark

module.exports = {
	createPost,
    getPost,
    particularPost,
    deletePost,
    followingPost,
    likePost,
    bookmarkPost
};