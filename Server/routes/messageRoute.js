const router = require("express").Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const messageModel = require("../models/message_model");
const User = require("../models/user_model");

router.post("/getmsg", async (req, res, next) => {
  try {
    const { from, to } = req.body;

    // Update the message with the given ID, setting the 'read' flag to true
    const updateResult = await messageModel.updateMany(
      {
        users: {
          $all: [from, to],
        },
      },
      { $set: { read: true } }
    );

    // console.log(updateResult.matchedCount)
    console.log("setting to read");

    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectmessages = messages.map((msg) => {
      // console.log(msg)

      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        id: msg._id,
        read: msg.read,
      };
    });
    return res.json(projectmessages);
  } catch (ex) {
    next(ex);
  }
});
router.post("/addmsg", async (req, res, next) => {
  try {
    const { from, to, message, to_email, sender } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      recipient: to,
      read: false,
    });
    // console.log(data)
    if (data) {
      const msg = {
        to: to_email, // Change to your recipient
        from: "dinos.marketplace.seng401@gmail.com", // Change to your verified sender
        subject: "New Message from DinosMarketplace",
        text: `Hey, you just got a new message from ${sender}: ${message}`,
        html: `<p>Hey, Welcome to DinosMarketplace. </p>
                <p>You just got a new message from ${sender}: ${message}</p>`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent to ", msg.to);
        })
        .catch((error) => {
          console.error(error);
        });
      return res.json({ msg: "Message added Successfully" });
    } else {
      return res.json({ msg: "Failed add message onto database" });
    }
  } catch (ex) {
    next(ex);
  }
});

router.post("/unread-messages", async (req, res, next) => {
  try {
    // Authenticate and get the user ID from the request
    const { from, to } = req.body;
    // console.log(from, to)
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    // console.log(messages)
    // Count unread messages where the recipient is the logged-in user
    const unreadCount = await messageModel.countDocuments({
      // recipient: new ObjectId(to),
      read: false,
      // from: new ObjectId(from),
      users: {
        $all: [to, from],
      },
    });
    // console.log("Unread messages are", unreadCount)

    res.json({ unreadCount });
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching unread messages" });
  }
});

router.put("/messages/:id/mark-as-read", async (req, res) => {
  try {
    const { from, to } = req.body;
    const messageId = req.params.id;

    // Update the message with the given ID, setting the 'read' flag to true
    const updateResult = await messageModel.updateOne(
      {
        _id: new ObjectId(messageId),
        recipient: new ObjectId(to),
      },
      { $set: { read: true } }
    );

    if (updateResult.matchedCount === 0) {
      res.status(404).json({ error: "Message not found" });
      return;
    }

    res.json({ message: "Message marked as read" });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res
      .status(500)
      .json({ error: "An error occurred while marking the message as read" });
  }
});

module.exports = router;
