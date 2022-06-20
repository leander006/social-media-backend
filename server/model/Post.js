const mongoose = require('mongoose');
const User = require('../model/User');

const PostSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    caption:{
        type:String,
        trim:true
    }, 
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment" 
          }
    ]
  
},
{timestamps:true}
)

module.exports = mongoose.model("Post",PostSchema)