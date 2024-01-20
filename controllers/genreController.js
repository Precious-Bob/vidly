const Genre = require('../models/genreModel');
const { catchAsync } = require('../middleware/catchAsync');
const AppError = require('../middleware/AppError');

exports.createGenre = catchAsync(async (req, res, next) => {
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  return res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
});

exports.getAllGenres = catchAsync(async (req, res, next) => {
  const genres = await Genre.find().sort('name');
  return res.status(200).json({
    status: 'success',
    data: {
      genres,
    },
  });
});

exports.patchGenre = catchAsync(async (req, res, next) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre) return next(new AppError('No genre found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
});

exports.getGenre = async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return next(new AppError('No genre found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
};

exports.deleteGenre = async (req, res, next) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return next(new AppError('No genre found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
};
