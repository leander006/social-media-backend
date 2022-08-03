const User = require("../model/User");
const asyncHandler = require('express-async-handler')

// register //

const setNotifications = asyncHandler(async(req,res) =>{
      const currentUser = await User.findById(req.user._id)
      console.log(currentUser);
    try {
      await currentUser.updateOne({$push:{Notifications:req.body.id}})
      const Users = await User.findById(currentUser._id)
      console.log(Users);
      res.cookie("data",JSON.stringify(Users),{ expires: new Date(Date.now() + 25892000000),
        secure:process.env.NODE_ENV === "production"?true:false,
        httpOnly:process.env.NODE_ENV === "production"?true:false,})
    .status(200).json(Users.Notifications)
    } catch (error) {
        res.status(500).json({error:error.message});
           
    }

})

const getNotifications = asyncHandler(async(req,res) =>{
      const currentUser = await User.findById(req.user._id)
    try {
      const notification=currentUser.Notifications
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({error:error.message});
           
    }

})

// login //



module.exports = {
      setNotifications,
      getNotifications
};