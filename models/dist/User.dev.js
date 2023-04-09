"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken'); // crypto is a building package : we  don't have to install it


var crypto = require('crypto');

var userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    validate: [validator.isEmail, 'Please enter valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password must be longer than 6 characters'],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false,
      "default": '../assets/default.jpg'
    }
  },
  role: {
    type: String,
    "default": 'admin'
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}); //encrypting password before saving

userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified('password')) {
            next();
          } //10 is the sort value


          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 10));

        case 3:
          this.password = _context.sent;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); //compare user Password

userSchema.methods.comparePassword = function _callee2(entredPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(entredPassword, this.password));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
}; //return JWT token


userSchema.methods.getJwtToken = function () {
  return jwt.sign({
    id: this._id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
}; // Generate password reset token 


userSchema.methods.getResetPasswordToken = function () {
  //generate token 
  var resetToken = crypto.randomBytes(20).toString('hex'); //hash and reset password token

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); //set token expire time 

  this.expirePasswordTime = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);