const express = require('express');
const ExampleModel = require('../models/example_model');
const UserModel = require('../models/user_model');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const router = express.Router()
const auth = require("../auth");

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

router.get("/auth-endpoint", auth, (req, res) => {
    res.json({ message: "You are authorized to access me" });
  });
  

router.post("/login", (req, res) => {
    // check if email exists
    UserModel.findOne({ email: req.body.email })
  
      // if email exists
      .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(req.body.password, user.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return res.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
  
            //   create JWT token
            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
  
            //   return success response
            res.status(200).send({
              message: "Login Successful",
              email: user.email,
              token,
            });
          })
          // catch error if password does not match
          .catch((error) => {
            res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        res.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });
  

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