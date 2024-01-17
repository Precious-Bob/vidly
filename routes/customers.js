const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');

const {
  createCustomer,
  getAllCustomers,
  patchCustomer,
  deleteCustomer,
  getCustomer,
} = require('../controllers/customerController');

router.get('/', getAllCustomers);
router.post('/', verifyToken, createCustomer);
router.patch('/:id', patchCustomer);
router.delete('/:id', deleteCustomer);
router.get('/:id', getCustomer);

module.exports = router;
