const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema(
    {
        members: [Number, Number], // we can either use Numbers or Strings for the user ID
        messages: [
          {
             sender: Number, 
             message: String, 
             timestamp: Date
          }],
       total_messages: Number
    });

module.exports = mongoose.model('Chat', chatSchema)