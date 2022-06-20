const mongoose = require('mongoose');
const User = require('../model/User');

const CommentSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true
    }, 
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
  
},
{timestamps:true}
)

module.exports = mongoose.model("Comment",CommentSchema)