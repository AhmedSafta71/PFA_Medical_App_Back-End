"use strict";

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  poster_id: {
    type: String,
    required: [true, 'post ID ']
  },
  poster_city: {
    type: String,
    required: [true]
  },
  poster_role: {
    type: String,
    required: true
  },
  poster_name: {
    type: String
  },
  responses: [{
    respondant_id: {
      type: String
    },
    respondant_name: {
      type: String
    },
    respondant_avatar: {
      type: String
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      "default": Date.now
    }
  }],
  title: {
    type: String,
    required: [true, 'title'],
    maxlength: [50, 'Le titre ne peut pas depasser 50 caractères']
  },
  description: {
    type: String,
    required: [true, 'description']
  },
  responseCount: {
    type: Number,
    "default": 0
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model('Question', questionSchema);