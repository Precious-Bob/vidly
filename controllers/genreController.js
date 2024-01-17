const Genre = require('../models/genreModel');

exports.createGenre = async (req, res) => {
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
};

exports.getAllGenres = async (req, res) => {
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
};

exports.patchGenre = async (req, res) => {
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
};

exports.getGenre = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
};

exports.deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with the given id was not found!');
  return res.status(200).json({
    status: 'success',
    data: {
      genre,
    },
  });
};
