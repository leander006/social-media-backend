const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }, 
    like:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    bookmar:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    message:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }
  
},
{timestamps:true}
)

module.exports = mongoose.model("Notification",NotificationSchema)