// Select the database to use.
use('vidlyGenres');

// Insert a few documents into the sales collection.
db.getCollection('genres').find();

db.createCollection('customers');

// Run a find command to view items sold on April 4th, 2014.
// const salesOnApril4th = db
//   .getCollection('sales')
//   .find({
//     date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') },
//   })
//   .count();

// // Print a message to the output window.
// console.log(`${salesOnApril4th} sales occurred in 2014.`);
