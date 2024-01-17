const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const { isAdmin } = require('../middleware/admin');

const {
  getAllGenres,
  createGenre,
  patchGenre,
  getGenre,
  deleteGenre,
} = require('../controllers/genreController');

router.get('/', getAllGenres);
router.post('/', verifyToken, createGenre);
router.patch('/:id', patchGenre);
router.delete('/:id', verifyToken, isAdmin, deleteGenre);
router.get('/:id', getGenre);

module.exports = router;