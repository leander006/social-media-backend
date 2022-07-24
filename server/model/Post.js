const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    caption:{
        type:String,
        trim:true,
        req:true
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