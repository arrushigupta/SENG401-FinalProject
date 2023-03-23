

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message:{
    text:{
        type:String,
        required:true,
    }
   
  }, 
  users:Array,
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  recipient: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },

  read: Boolean, // Flag to indicate if the message has been read


},
{
    timestamps:true,
}

);

module.exports = mongoose.model("Messages", messageSchema);