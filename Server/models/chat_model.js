import {userSchema}from './user_model.js';
const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema(
    {from : {
        type: userSchema, 
        required: true
    }, 
    to : {
        type: userSchema, 
        required: true
    }, 
    date: {
        required: true, 
        type: Date, 
        default: Date.now
    }, 
    messages: [],
    
});

module.exports = mongoose.model('Chat', chatSchema)