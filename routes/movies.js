const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const {
  createMovie,
  getAllMovies,
  getMovie,
  patchMovie,
  deleteMovie,
} = require('../controllers/movieController');

router.post('/:id', verifyToken, createMovie);
router.get('/', getAllMovies);
router.get('/:id', getMovie);
router.patch('/:id', patchMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
