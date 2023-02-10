require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

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
app.use('/api', routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

