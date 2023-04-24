'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL);

// require schema
const Book = require('./models/books.js');

async function seed() {
  await Book.create({
    title: 'The Catcher in the Rye',
    description: 'This novel is a coming-of-age story about a teenage boy named Holden Caulfield who struggles to find his place in the world.',
    status: 'available'

  });
  console.log('The Catcher in the Rye was created');

  await Book.create({
    title: 'The Lord of the Rings',
    description: 'A fantasy novel set in a fictional world called Middle-earth, where a hobbit named Frodo Baggins embarks on a quest to destroy a powerful ring.',
    status: 'available'

  });

  await Book.create({
    title: 'To Kill a Mockingbird',
    description: 'This classic novel tells the story of a young girl growing up in the South during the 1930s and her fathers defense of a black man falsely accused of rape.',
    status: 'available'

  });
  mongoose.disconnect();
  console.log('books were seeded');
}
seed();
