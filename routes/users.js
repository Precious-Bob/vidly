const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const { signup, myProfile } = require('../controllers/userController');

router.post('/signup', signup);
router.get('/me', verifyToken, myProfile);

module.exports = router;
