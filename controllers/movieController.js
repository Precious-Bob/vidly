const Movie = require('../models/movieModel');
const Genre = require('../models/genreModel');
const { catchAsync } = require('../middleware/catchAsync');
const AppError = require('../middleware/AppError');

exports.createMovie = catchAsync(async (req, res, next) => {
  let genre = await Genre.findById(req.params.id).populate('genre');
  console.log(genre);
  console.log(req.body);

  const { title, numberInStock, dailyRentalRate } = req.body;

  let movie = new Movie({
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    title,
    numberInStock,
    dailyRentalRate,
  });

  await movie.save();

  return res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.find().sort('name').populate('genre');
  return res.status(200).json({
    status: 'success',
    data: {
      movies,
    },
  });
});

exports.patchMovie = catchAsync(async (req, res, next) => {
  let genre = await Genre.findById(req.body.genreId).populate('genre');
  if (!genre) return next(new AppError('No genre found with that ID', 404));

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: { _id: genre._id, name: genre.name },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie) return next(new AppError('No movie found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id).populate('genre');
  if (!movie) return next(new AppError('No movie found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id).populate('genre');
  if (!movie) return next(new AppError('No movie found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});
