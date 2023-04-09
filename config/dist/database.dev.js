"use strict";

var mongoose = require('mongoose'); // const dotenv=require('dotenv'); 
// const path = require('path');
// dotenv.config({path: '.env'}); 


var DB_URI = '';

var connectDatabase = function connectDatabase() {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true //useCreateIndex: false

  }).then(function (con) {
    console.log("MongoDB Database connected with HOST: ".concat(con.connection.host));
  });
};

module.exports = connectDatabase;