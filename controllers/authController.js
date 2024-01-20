const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { catchAsync } = require('../middleware/catchAsync');

router.post(
  '/',
  catchAsync(async (req, res, next) => {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) return res.status(400).send('Invalid email or password');
    console.log(password);
    console.log(user.password);

    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword)
      return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.status(201).json({ message: `welcome, ${user.name}`, token: token });
  })
);

module.exports = router;
