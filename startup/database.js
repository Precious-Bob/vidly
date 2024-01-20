const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

module.exports = function () {
  mongoose
    .connect(DB)
    .then((con) => {
      console.log('DB connection successful');
    })
    .catch((error) => {
      console.error('Error connecting to the database', error);
    });
};
