const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    token:{
        type:String,
        require:true,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Token",tokenSchema)