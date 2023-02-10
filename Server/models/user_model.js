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
    }
})

module.exports = mongoose.model('User', userSchema)