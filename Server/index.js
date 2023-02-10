const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

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


const routes = require('./routes/routes');
app.use('/api', routes)

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

