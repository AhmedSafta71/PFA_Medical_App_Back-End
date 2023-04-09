"use strict";

var COOKIE_EXPIRES_TIME = 7; // Create and send token and save in the cookie.

var sendToken = function sendToken(user, statusCode, res) {
  // create token    
  var token = user.getJwtToken(); //cookie options 

  var options = {
    expires: new Date(Date.now() + COOKIE_EXPIRES_TIME * 24 * 60 * 1000),
    httpOnly: true,
    withCredentials: true
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token: token,
    user: user
  });
};

module.exports = sendToken;