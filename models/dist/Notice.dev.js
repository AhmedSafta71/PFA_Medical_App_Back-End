"use strict";

var mongoose = require('mongoose');

var noticeSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [30, 'Your name cannot exceed 30 characters']
  },
  message: {
    type: String,
    required: [true, 'Please enter  message']
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
    "default": 'Patient'
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});