const User = require("../model/User");
const asyncHandler = require('express-async-handler');
const Post = require("../model/Post")
const Message= require("../model/Message");
const { cloudinary } = require("../utils/cloudinary");
const passport = require("passport")
const dotenv = require('dotenv');
const Token = require("../model/Token");

const particularUser = asyncHandler(async(req,res) =>{
            const name = req.query.name
            const userId = req.query.userId
      try {
            const users = name ? await User.find({"_id":{$ne:req.user._id},username:{$regex:name ,$options:'$i'}}):await User.findById(userId).populate("following","-password").populate("followers","-password")
                  return res.status(200).json(users)
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})



// Search friend //

const friendSearch = asyncHandler(async(req,res) =>{
      const name = req.query.name
try {
      const users = await User.find({"_id":{$ne:req.user._id},followers:{$elemMatch:{$eq:req.user._id}},username:{$regex:name ,$options:'$i'}})
      if(users.length !== 0){
            return res.status(200).json(users)
      }
      return res.status(404).send({error:"User doest not exist"});

 } catch (error) {
       return res.status(500).send({error:error.message})
 }
})

// get all user //

const userById = asyncHandler(async(req,res) =>{
      try {
           const user = await User.findById(req.params.id).populate("following","-password").populate("followers","-password")
           const post = await Post.find({owner:req.params.id}).populate("owner")
           return res.status(200).json({user:user,post:post})
      } catch (error) {
            return res.status(500).send({error:error.message})
      }

})

// get user by id//



const allUser = asyncHandler(async(req,res) =>{
      try {
           const allUsers = await User.find({_id:{$ne:req.user._id}}).populate("following","-password").populate("followers","-password")
           return res.status(200).json(allUsers)
      } catch (error) {
            return res.status(500).send({error:error.message})
      }

})

// delete

const remove = asyncHandler(async(req,res) =>{
      try {
       
           const post = await Post.find({owner:req.user._id})
           const message = await Message.find({owner:req.user._id})
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
       
          
            const allUsers = await User.find({_id:{$ne:req.user._id}}).populate("following","-password").populate("followers","-password")
             return res.status(200).json(allUsers);
 
 
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})
//get login user
const loginUser =asyncHandler(async(req,res) =>{
      try {
            const users = await User.findOne({_id:{$eq:req.user._id}}).populate("following","-password").populate("followers","-password")
             return res.status(200).json(users);
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})

// Update user //

const uploadPic =async (req, res) => {
      try {
          const fileStr = req.body.data;
          const uploadResponse = await cloudinary.uploader.upload(fileStr, {
              upload_preset: 'Social_Media_app',
          });
          res.status(200).json(uploadResponse);
      } catch (err) {
          console.error(err);
          res.status(500).json({ err: 'Something went wrong' });
      }
  };


const updateUser =asyncHandler(async(req,res) =>{
      try {
            const user = await User.findByIdAndUpdate(req.params.id,
                 {     
                       name:req.body.name,
                       bio:req.body.bio,
                       username:req.body.username,
                       status:req.body.status,
                       profile:req.body.profile
                 },
            { new: true })
            return res.cookie("data",JSON.stringify(user),{ expires: new Date(Date.now() + 25892000000),
                  secure:process.env.NODE_ENV === "production"?true:false,
                  httpOnly:process.env.NODE_ENV === "production"?true:false,})
              .status(200).json(user)
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})



const suggestedUser =asyncHandler(async(req,res) =>{

      try {
            var users = await User.find({"_id":{$ne:req.user._id},followers:{$nin:req.user._id}})
            function getMultipleRandom(users, num) {
                  const shuffled = [...users].sort(() => 0.5 - Math.random());

                  return shuffled.slice(0, num);
            }
            res.status(200).json(getMultipleRandom(users, 5))
       } catch (error) {
             return res.status(500).send({error:error.message})
       }
})

const token =async(req,res) =>{
      try {
            const user = await User.findOne({_id:req.params.id})
            if(!user){
                  return res.status(400).send({message:"Invalid link"});
            }
            const token = await Token.findOne({
                  userId:user._id,
                  token:req.params.token,
            })
            if(!token) return res.status(401).send({message:"Invalid link"});
           const newUser= await User.findByIdAndUpdate(user._id,{isVerified:true});
           
            await Token.findByIdAndDelete(token._id);

            res.status(200).json(newUser);
      } catch (error) {
            return res.status(500).send({message:"Internal server error"});
      }
}



module.exports = {
	allUser,
      particularUser,
      remove,
      groupUser,
      updateUser,
      loginUser,
      userById,
      suggestedUser,
      uploadPic,
      friendSearch,
      token 
};