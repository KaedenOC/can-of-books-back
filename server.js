'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/books');

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON body parsing for POST requests

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
    const allBooks = await Book.find({});
    response.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }
});

app.post('/books', async (request, response, next) => {

  try {
    const book = await Book.create(request.body);
    response.status(201).send(book);
  } catch (error) {
    console.log(error);
    next(error);
  }

});

app.delete('/books/:bookID', async (request, response, next) => {
  try {
    let id = request.params.bookID;
    await Book.findByIdAndDelete(id);
    console.log(request.params);
    response.status(200).send('book deleted');
  } catch (error) {
    next(error);
  }
});

app.put('/books/:bookID', async (request, response, next) => {
  try {
    const bookId = request.params.bookID;
    const updatedBook = await Book.findByIdAndUpdate(bookId, request.body, {
      new: true,
    });
    response.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));