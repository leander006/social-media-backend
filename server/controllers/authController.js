const User = require("../model/User");
const bcrypt = require('bcrypt');
const generateToken = require('../config/authToken')
const asyncHandler = require('express-async-handler')
const passport = require("passport");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Token = require("../model/Token");
// register //

const registration = asyncHandler(async(req,res) =>{

    const {username,email,password,name} = req.body;

    if(!username || !email || !password || !name)
    {
        return res.status(401).json({error:"Please enter all  field"});
    } 

    const userExist = await User.findOne({username:username});

    const emailExist = await User.findOne({email:email})
    try {
         if(userExist !== null )
        {
            return res.status(400).json({error:"Username Exists"});
        }
        else  if(emailExist !== null)
        {
            return res.status(400).json({error:"Email Exists"});
        }
  
          const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username:username,
            email:email,
            password:hashPassword,
            name:name
        })

        const user = await newUser.save();

        const token =await new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex"),
        }).save();
        const url =`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email,"Verify email",url);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error:error.message});
           
    }

})

// login //

const login =asyncHandler(async(req,res)=>{
    const {username} = req.body;
    try {
        if(!username || !req.body.password )
        {
            return res.status(402).json({error:"Please all field"})
        }
        const user = await User.findOne({username});
        if(!user)
        {
            return res.status(400).json({error:"User does not exits!"});
        }
        const validate = await bcrypt.compare(req.body.password,user.password)
        if(!validate)
        { 
            return res.status(402).json({error:"Invalid password"})
        }
           //Send confirmation email//
           let tokens = await Token.findOne({userId:user._id})
          if(!user.isVerified)
          { 
              console.log("false");
              if(!tokens){
               tokens =await new Token({
                   userId:user._id,
                   token:crypto.randomBytes(32).toString("hex"),
               }).save();
               const url =`${process.env.BASE_URL}users/${user._id}/verify/${tokens.token}`;
               await sendEmail(user.email,"Verify email",url);
               return res.status(400).send({message:"An email send to your account for verification"});
           }
       }
    // //------------------------------------------//
    if(user.isVerified){
       const { password, ...others } = user._doc;
       const token=generateToken(user.id);
       res.cookie("token",token,{ expires: new Date(Date.now() + 25892000000),
        secure:process.env.NODE_ENV === "production"?true:false,
        httpOnly:process.env.NODE_ENV === "production"?true:false,})
        res.cookie("data",JSON.stringify(others),{ expires: new Date(Date.now() + 25892000000),
            secure:process.env.NODE_ENV === "production"?true:false,
            httpOnly:process.env.NODE_ENV === "production"?true:false,})
        .status(200).json({others})
    }
    } catch (error) {
        res.status(501).json(error.message)
       console.log(error.message);
    }
    
})
 
const logout = ((req,res)=>{
      req.logout();
      console.log("logout");
      res.redirect("http://localhost:3000");
})

const callback =passport.authenticate('google', { failureRedirect: '/login' })


const google = passport.authenticate("google", { scope: [ 'email' ] })

const callFunction =((req, res) =>{
    // Successful authentication, redirect home.
    const token=generateToken(req.user._id);
    res.cookie("token",token,{ expires: new Date(Date.now() + 25892000000),
     secure:process.env.NODE_ENV === "production"?true:false,
     httpOnly:process.env.NODE_ENV === "production"?true:false,})
     res.cookie("data",JSON.stringify(req.user),{ expires: new Date(Date.now() + 25892000000),
         secure:process.env.NODE_ENV === "production"?true:false,
         httpOnly:process.env.NODE_ENV === "production"?true:false,})
    //  .status(200).json({others})
    res.redirect("http://localhost:3000/home");
  })
module.exports = {
	registration,
    login,
    logout,
    google,
    callback,
    callFunction
};