const express = require('express');
const ExampleModel = require('../models/example_model');
const UserModel = require('../models/user_model');
const bcrypt = require("bcrypt")
const router = express.Router()
module.exports = router;

// basic test methods

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

router.post('/register', async (req, res) => {
    console.log(req.body);
    // need to check if user with same email or username exists in the database
    
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
        const data = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave, {message: "Success!"})
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    });
})