const Rental = require('../models/rentalModel');
const { catchAsync } = require('../middleware/catchAsync');
const AppError = require('../middleware/AppError');


exports.getAllRentals = catchAsync(async (req, res, next) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

exports.createRental = catchAsync(async (req, res, next) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return next(new AppError('Invalid customer', 404));

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return next(new AppError('Invalid movie', 404));

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie not in stock.');

  const session = await mongoose.startSession();
  session.startTransaction();

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
});

exports.getRental = catchAsync(async (req, res, next) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return next(new AppError('No movie found with that ID', 404));

  res.send(rental);
});
