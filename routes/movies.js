const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Movie, Genre } = require('../models');

router.get('/', async (_, res) => {
  try {
    const movies = await Movie.find().sort('name');
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
});

router.patch('/:id', async (req, res) => {
  try {
    let genre = await Genre.findById(req.body.genreId);
    if (!genre) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid genre id',
      });
    }

    const movie = await movie.findByIdAndUpdate(
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
});

router.post('/', async (req, res) => {
  try {
    let genre = await Genre.findById(req.body.genreId);
    if (!genre) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid genre id',
      });
    }

    let movie = new Movie({
      title: req.body.title,
      genre: { _id: genre._id, name: genre.name },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    movie = await movie.save();

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
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send('The movie with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie)
    return res.status(404).send('The movie with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});
module.exports = router;
