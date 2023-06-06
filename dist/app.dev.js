"use strict";

var express = require('express');

var helmet = require('helmet');

var dotenv = require('dotenv');

var passport = require('passport');

var _require = require('passport-google-oauth20'),
    Strategy = _require.Strategy;

var https = require('https');

var fs = require('fs');

var fileUpload = require('express-fileupload');

var path = require('path');

dotenv.config({
  path: '.env'
}); //create an express app 

var app = express();
AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('Google profile ', profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
app.use(helmet());
app.use(passport.initialize());

var errorMiddelware = require('./middlewares/errors');

var connectDatabase = require('./config/database');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var cloudinary = require('cloudinary');

var doctors = require('./routes/doctorsRoutes');

var users = require('./routes/userRoutes');

var patients = require('./routes/patientRoutes');

var questions = require('./routes/questionRoutes');

var payments = require('./routes/payementRoute'); // handle uncaught exceptions 


process.on('uncaughtException', function (err) {
  console.log("error: ".concat(err.stack));
  console.log("shutting down due to uncaught exceptions ");
  process.exit(1);
});
connectDatabase();
https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(process.env.PORT, function () {
  console.log("Process is running on port ".concat(process.env.PORT, " in ").concat(process.env.NODE_ENV, " mode."));
});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(fileUpload({
  useTempFiles: true
})); // use default routes cf

try {
  app.use('', doctors);
  app.use('', users);
  app.use('', patients);
  app.use('', questions);
  app.use('', payments);
} catch (error) {
  console.log("error ", error);
} //set up cloudianry 


try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
} catch (err) {
  console.log(err);
}