const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }, 
    message:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }
  
},
{timestamps:true}
)

module.exports = mongoose.model("Notification",NotificationSchema)