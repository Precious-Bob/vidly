const helmet = require('helmet');
//const Joi = require('joi');
const express = require('express');
const app = express();
const morgan = require('morgan');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const auth = require('./controllers/authController');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const AppError = require('./middleware/AppError');
const dotenv = require('dotenv');
dotenv.config();
require('./startup/database')();

require('./startup/logging')();

//! import morgan first then run this
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

// Environment variables
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(helmet());
app.use(express.json()); // This middleware enables JSON request body parsing
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(AppError);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server