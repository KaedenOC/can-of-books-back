'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/books');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.DATABASE_URL);

// HELPFUL TO TROUBLESHOOT IN TERMINAL AS TO WHY YOU CANT CONNECT TO MONGODB

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

app.get('/books', async (request, response, next) => {

  try {
    let allBooks = await Book.find({});
    response.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
