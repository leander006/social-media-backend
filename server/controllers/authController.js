const User = require("../model/User");
const bcrypt = require('bcrypt');
const generateToken = require('../config/authToken')
const asyncHandler = require('express-async-handler')

// register //

const registration = asyncHandler(async(req,res) =>{

    const {username,email,password} = req.body;

    if(!username || !email || !password)
    {
        return res.status(401).json({error:"Please enter all  field"});
    } 
    const userExist = await User.findOne({username});
    const emailExist = await User.findOne({email})

    try {
         if(userExist)
        {
            return res.status(400).json({error:"Username Exists"});
        }
    else  if(emailExist)
    {
        return res.status(400).json({error:"Email Exists"});
    }
  
          const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username:username,
            email:email,
            password:hashPassword,
        })

        const user = await newUser.save();
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
       const { password, ...others } = user._doc;
       const token=generateToken(user.id);
       res.cookie("token",token,{ expires: new Date(Date.now() + 25892000000),
        secure:process.env.NODE_ENV === "production"?true:false,
        httpOnly:process.env.NODE_ENV === "production"?true:false,})
        res.cookie("data",JSON.stringify(others),{ expires: new Date(Date.now() + 25892000000),
            secure:process.env.NODE_ENV === "production"?true:false,
            httpOnly:process.env.NODE_ENV === "production"?true:false,})
        .status(200).json({others,token:token})
    } catch (error) {
        res.status(501).json(error.message)
       console.log(error.message);
    }
})
 


module.exports = {
	registration,
    login
};