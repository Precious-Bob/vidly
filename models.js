const mongoose = require('mongoose');

const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: { type: String, required: true },
    isGold: { type: Boolean, required: true },
    phone: { type: String, required: true },
  })
);

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: { type: String, required: true, minlength: 5, maxlength: 50 },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      minlength: 0,
      maxlength: 50,
    },
  })
);

module.exports = { Genre, Customer, Movie };
