const Rental = require('../models/rentalModel');
const { MongoClient } = require('mongodb');

exports.getAllRentals = async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
};

exports.createRental = async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie not in stock.');

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    await rental.save({ session });
    await Movie.updateOne(
      { _id: movie._id },
      { $inc: { numberInStock: -1 } },
      { session }
    );

    await session.commitTransaction();
    res.send(rental);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).send('Error creating rental');
  } finally {
    session.endSession();
  }
};

exports.getRental = async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
};
