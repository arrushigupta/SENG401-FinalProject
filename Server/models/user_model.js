const mongoose = require('mongoose');


// example model

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }, 
    username: {
        required: true,
        type: String
    }, 
    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      }
    // fName:{ // first name
    //     type: String, 
    //     required: true
    // }, 
    // lName:{ // last name
    //     type: String, 
    //     required: true
    // }, 
    // phoneNumber:{
    //     type:Number
    // }
})

module.exports = mongoose.model('User', userSchema)