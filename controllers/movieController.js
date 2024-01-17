const Movie = require('../models/movieModel');
const Genre = require('../models/genreModel');

exports.createMovie = async (req, res) => {
  try {
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
  } catch (err) {
    console.error('Error creating movie', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort('name').populate('genre');
    return res.status(200).json({
      status: 'success',
      data: {
        movies,
      },
    });
  } catch (error) {
    console.error('Error fetching movies from the database', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.patchMovie = async (req, res) => {
  try {
    let genre = await Genre.findById(req.body.genreId).populate('genre');
    if (!genre) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid genre id',
      });
    }

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
    if (!movie)
      return res.status(404).send('The movie with the given id was not found!');
    return res.status(200).json({
      status: 'success',
      data: {
        movie,
      },
    });
  } catch (err) {
    console.error('Error updating movie', err);
  }
};

exports.getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('genre');
  if (!movie)
    return res.status(404).send('The movie with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
};

exports.deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id).populate('genre');
  if (!movie)
    return res.status(404).send('The movie with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
};
