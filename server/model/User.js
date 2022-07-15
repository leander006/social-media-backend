const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true,
        unique:true
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
        default:''
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
    }
},
{timestamps:true}
)

module.exports = mongoose.model("User",UserSchema)