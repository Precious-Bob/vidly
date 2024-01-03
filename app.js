const helmet = require('helmet');
//const Joi = require('joi');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

const dotenv = require('dotenv');
dotenv.config();

app.use(helmet());

//! import morgan first then run this
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

// Environment variables
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log('DB connection successful');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

app.use(express.json()); // This middleware enables JSON request body parsing
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
