const User = require("../model/User");
const asyncHandler = require('express-async-handler');
const Post = require("../model/Post")
const Message= require("../model/Message");

const particularUser = asyncHandler(async(req,res) =>{
      try {
            const name = req.query.name
            const userId = req.query.userId
            const users = name ? await User.find({username:{$regex:name ,$options:'$i'}}).populate("following","-password").populate("followers","-password"):await User.findById(userId).populate("following","-password").populate("followers","-password")
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
           const post = await Post.find({owner:req.params.id})
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

const updateUser =asyncHandler(async(req,res) =>{
      // console.log(req.file);

      try {
            const user = await User.findByIdAndUpdate(req.params.id,
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

const suggestedUser =asyncHandler(async(req,res) =>{
      console.log("suggesteduser");
      try {


            const user = await User.findById(req.user._id)
            const following = user.following

            // console.log(following);
            // const user = await User.find({following})
           
            
            // id.push(following[Math.floor(Math.random() * following.length)])

            // const id1 = following[Math.floor(Math.random() * following.length)]
            // id.splice(indexs)
            // console.log(id.includes(id1));
            // if(id.includes(id1) === false){
            //       id.push(id1)
            // }

            // console.log(following({length: 2}, () => Math.floor(Math.random() * 40)))
                  // id.push(id1)
            // }
            // else{
            //       id.push(following[Math.floor(Math.random() * following.length-1)])
            // }

            // id.push(following[Math.floor(Math.random() * following.length)])
            // id.push(following[Math.floor(Math.random() * following.length)])
            // console.log(following[Math.floor(Math.random() * following.length)]);
            // console.log(id);
            // const newUser = await User.findById(req.user._id)
            // const following = newUser.following
            // const alluser = await User.find({})
            // const moreuser  = []
            // moreuser.push(allUser)
            // console.log(typeof(moreuser));
            // moreuser.pull(following)
     
            // console.log(users);
            // console.log(moreuser);

            // const moreuser = await Promise.all(
                  // following.map((id) =>{
                  //     return User.findById({$ne:id})
                  // })
            //   )
            //   console.log("moreuser ",moreuser);
            // const user = await User.find({$nt:req.user._id,postCount: { $gt: 0 }, })
            
            // return res.status(200).json(user)
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
      loginUser,
      userById,
      suggestedUser
};