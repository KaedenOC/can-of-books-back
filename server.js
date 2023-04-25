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
    const { title, description, status } = request.body;

    // Check if any required properties are missing from the request body
    if (!title || !description || !status) {
      return response.status(400).json({ error: 'Missing required properties' });
    }

    const newBook = new Book({
      title: title,
      description: description,
      status: status
    });
    const savedBook = await newBook.save();
    response.status(201).json(savedBook);
  } catch (error) {
    // If there's an error saving the book to the database, return a 500 Internal Server Error status code
    response.status(500).json({ error: error.message });
    next(error);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
