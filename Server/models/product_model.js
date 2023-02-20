const mongoose = require('mongoose');

// I think User should have posts, and those posts can be null but like it should be in the schema
const productSchema = new mongoose.Schema(
    {
    userID:{
        type : String,  // or Number
        required: true
    }, 
    name : {
        type: String, 
        required: true
    }, 
    images:[], // images are not required in Javi's opinion
    
    date: {
        required: true, 
        type: Date, 
        default: Date.now
    }, 
    price: Number, 

    category: {
        type: String, 
        required: true
    }, 

    description: {
        type: String
    }
    
    });