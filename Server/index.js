require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const socket = require("socket.io");

// connection to MongoDB database
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


// creates express app

const app = express();
app.use(express.json());
app.use(cors())

const routes = require('./routes/routes');
const messageRoute = require("./routes/messageRoute");

app.use('/api', routes)
app.use('/api', messageRoute)

const server =  app.listen(process.env.PORT || 4000 ,()=>{
    console.log(`Server connected successfully on Port  ${process.env.PORT}.`);
});

const io = socket(server, {
    cors: {}
}
);

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log("New user added.")
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
    });
});

