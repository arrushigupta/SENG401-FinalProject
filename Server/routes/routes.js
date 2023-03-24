const express = require("express");
const ExampleModel = require("../models/example_model");
const UserModel = require("../models/user_model");
const ProductModel = require("../models/product_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../auth");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = router;

// basic test methods

//Get all Method
router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

//Get by ID Method
router.get("/getOne/:id", (req, res) => {
  res.send("Get by ID API");
});

//Update by ID Method
router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

//Delete by ID Method
router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});

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
            isAvatarImageSet: user.isAvatarImageSet,
            avatarImage: user.avatarImage,
            emailVerified: user.emailVerified,
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
router.patch("/verifyEmail/:user", async (req, res) => {
  console.log(req.params.user); // here it will change the users

  await UserModel.updateOne(
    { username: req.params.user },
    { $set: { emailVerified: true } },
    (err, user) => {
      console.log(user);
      err ? console.log(err) : res.status(200).json({ status: "success" });
    }
  ).clone();
});

router.post("/register", async (req, res) => {
  if (!/\b[A-Za-z0-9._%+-]+@ucalgary\.ca\b/.test(req.body.email)) {
    return res.json({
      message: "Email must be a ucalgary.ca email",
      status: "error",
    });
  }
  // need to check if user with same email or username exists in the database
  const emailCheck = await UserModel.findOne({ email: req.body.email });
  if (emailCheck)
    return res.json({ message: "Email already used", status: "error" });
  const usernameCheck = await UserModel.findOne({
    username: req.body.username,
  });
  if (usernameCheck)
    return res.json({ message: "Username already used", status: "error" });
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    const data = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    try {
      const dataToSave = await data.save();

      // will need to be changed to site's url
      const url = `http://localhost:3000/verifyEmail?user=${req.body.username}`;
      const msg = {
        to: req.body.email, // to the user's email
        from: "dinos.marketplace401@gmail.com", // Change to your verified sender
        subject: "Hello from DinosMarketplace!",
        html: `<p>Hello from DinosMarketplace! </p>
      <p>Please verify your account by clicking the link</p>
      <a target="_blank" href="${url}">Here</a>
      <p>If this was not you please disregard this email.</p>`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent to ", msg.to);
        })
        .catch((error) => {
          console.error(error);
        });
      res.status(200).json({ ...dataToSave, status: "success" });
    } catch (error) {
      res.status(400).json({ message: error.message, status: "error" });
    }
    // will need to be changed to site's url
  });
});

// The following are apis for products, should we put them in their page to have microservice architecture? --------------
router.post("/postProduct", async (req, res) => {
  console.log(req.body);

  const product = new ProductModel({
    userID: req.body.userID,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    date: req.body.date,
  });

  try {
    const dataToSave = await product.save();
    res.status(200).json({ ...dataToSave, status: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: "error" });
    console.log(error.message);
  }
});

// return all products by the date they were created
router.get("/getAllProducts", async (req, res) => {
  console.log(req.body);

  ProductModel.find({})
    .sort({ _id: -1 })
    .exec((error, products) => {
      if (error) {
        console.log("Error retrieving products:", error);
        return res
          .status(400)
          .json({ message: error.message, status: "error" });
      }
      console.log("Retrieved products:", products);
      return res.json(products);
    });
});

// filter products by searching a specific type(attribute), then filter that type by the value param
// This should be the only API endpoint needed for filtering data related to products
// example localhost:4000/api/getSpecificProducts/name/h

router.get("/getSpecificProducts/:type/:value", (req, res) => {
  const type = req.params.type;
  const value = req.params.value;
  const filter = {};
  filter[type] = value;

  ProductModel.find(filter, (err, products) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving products");
    } else {
      res.send(products);
    }
  });
});

// -------------------------------------------------------------------------------------------------------------------------

router.post("/setavatar/:id", async (req, res, next) => {
  // console.log("setAvatar is called", req)
  try {
    const userid = req.params.id;

    const avatarImage = req.body.image;

    const userData = await UserModel.findByIdAndUpdate(
      userid,

      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
});

router.get("/allusers/:id", async (req, res, next) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "avatarImage",
      "email",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
});
