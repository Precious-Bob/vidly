const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const {
  getAllRentals,
  createRental,
  getRental,
} = require('../controllers/rentalController');

router.get('/', getAllRentals);
router.post('/', verifyToken, createRental);
router.get('/:id', getRental);

module.exports = router;
