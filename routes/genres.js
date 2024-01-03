//const app = require('../app');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Genre } = require('../models');

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().sort('name');
    return res.status(200).json({
      status: 'success',
      data: {
        genres,
      },
    });
  } catch (error) {
    console.error('Error fetching genres from the database', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    return res.status(200).json({
      status: 'success',
      data: {
        genre,
      },
    });
  } catch (err) {
    console.error('Error creating genre', err);
    res.status(500).send('Internal Server Error');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!genre)
      return res.status(404).send('The genre with the given id was not found!');
    return res.status(200).json({
      status: 'success',
      data: {
        genre,
      },
    });
  } catch (err) {
    console.error('Error updating genre', err);
  }
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
});

module.exports = router;
