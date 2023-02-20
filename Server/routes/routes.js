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
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              status: "error",
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
            username: user.username,
            _id: user._id,
            status: "success",
            isAvatarImageSet:user.isAvatarImageSet,
            avatarImage:user.avatarImage,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            status: "error",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        status: "error",
        e,
      });
    });
});


router.post('/register', async (req, res) => {
  console.log(req.body);

  // need to check if user with same email or username exists in the database
  const emailCheck = await UserModel.findOne({ email: req.body.email })
  if (emailCheck)
    return res.json({ message: "Email already used", status: "error" });
  const usernameCheck = await UserModel.findOne({ username: req.body.username })
  if (usernameCheck)
    return res.json({ message: "Username already used", status: "error" });
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    const data = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,

    })
    try {
      const dataToSave = await data.save();
      res.status(200).json({ ...dataToSave, status: "success" })
    }
    catch (error) {

      res.status(400).json({ message: error.message, status: "error" })
    }
  });
})

// The following are apis for products, should we put them in their page to have microservice architecture? --------------
router.post('/postProduct', async (req, res) => {
  
  console.log(req.body);
  
    // const data = new ProductModel({
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: hash,

    // })
    // try {
    //   const dataToSave = await data.save();
    //   res.status(200).json({ ...dataToSave, status: "success" })
    // }
    // catch (error) {

    //   res.status(400).json({ message: error.message, status: "error" })
    // };
})



// -------------------------------------------------------------------------------------------------------------------------

router.post("/setavatar/:id", async (req, res, next) => {
  // console.log("setAvatar is called", req)
  try {
      const userid = req.params.id;

      const avatarImage = req.body.image;

      const userData = await UserModel.findByIdAndUpdate(userid,

          {
              isAvatarImageSet: true,
              avatarImage
          },
          { new: true }

      );
      return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
  } catch (ex) {
      next(ex);
  }

})

router.get("/allusers/:id", async (req, res, next) => {
  try {
      const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
          "username",
          "avatarImage",
          "email",
          "_id"
      ]);
      return res.json(users);
  } catch (ex) {
      next(ex);

  }
})