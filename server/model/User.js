const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId:{
        type:String,
        required:false,
        unique:true
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
    },
    verified:{
        type:Boolean,
        default:false
    },
    postCount: {
        type: Number,
        default: 0,
    },
    isFollowing: {
        type: Boolean,
        default: false,
    },
    isUnFollowing: {
        type: Boolean,
        default: false,
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
},
{timestamps:true}
)

module.exports = mongoose.model("User",UserSchema)