
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:false,
    },
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKSLF2KD0x9KU5CwmXdqJjrphNQNmJgqzjPQ&usqp=CAU'
    },
    bio: {
        type: String,
        default: '',
    },
    followers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    following: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    status:{
        type:String,
        enum: ['Public', 'Private'],
        default: 'Public'
    },
    postCount:{
        type:Number,
        default:0
    },
    likedPost: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    bookmarkedPost: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    isVerified:{
        type:String,
        default:false
    },
},
{timestamps:true}
)

module.exports = mongoose.model("User",UserSchema)