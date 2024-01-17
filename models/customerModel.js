const mongoose = require('mongoose');

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: { type: String, required: true },
    isGold: { type: Boolean, required: true },
    phone: { type: String, required: true },
  })
);

module.exports = Customer;
