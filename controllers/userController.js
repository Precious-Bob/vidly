const User = require('../models/userModel');

exports.signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).send('User already registered');
    user = new User({ name, email, password });
    await user.save();

    const token = user.generateAuthToken();

    res.set({
      'Content-Type': 'application/json',
      'x-auth-token': token,
    });

    res
      .status(201)
      .json({ message: 'User registered successfully', user: user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
    console.log(error);
  }
};

exports.myProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json({
    status: 'success',
    user: user,
  });
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE2ODMwZTEwZDI2ZTVjZDJiMzAxYzUiLCJpYXQiOjE3MDU0MTEzNDJ9.TUp51P__TMDlnQP4U0NvXpLC8Ur-Xc3BlK2wX768iOE
