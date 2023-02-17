const router = require("express").Router();

const messageModel = require("../models/message_model");
const User= require('../models/user_model')

router.post("/getmsg", async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            },

        }).sort({ updatedAt: 1 });
        const projectmessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });
        return res.json(projectmessages);

    } catch (ex) {
        next(ex);
    }

});
router.post("/addmsg", async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message:
                { text: message }
            ,
            users: [from, to],
            sender: from,
        });
        if (data) {
            return res.json({ msg: "Message added Successfully" });
        }
        else {
            return res.json({ msg: "Failed add message onto database" });
        }
    }
    catch (ex) {
        next(ex)
    }

});

module.exports = router;