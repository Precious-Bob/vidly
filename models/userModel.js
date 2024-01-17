const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email!'],
    unique: true, // Ensure email is unique
    minlength: 5,
    maxlength: 250,
    lowercase: true, // Converts email to lowercase
    //validate: [validate.isEmail, 'Please provide a valid email!']
  },

  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8,
    maxlength: 1024,
  },
  admin: Boolean,
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, admin: user.admin },
    process.env.JWT_SECRET
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
