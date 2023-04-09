"use strict";

var ErrorHandler = require("../utils/errorHandler");

var catchAssyncErrors = require("./catchAssyncErrors");

var jwt = require("jsonWebtoken");

var Patient = require("../models/Patient");

var Doctor = require("../models/Doctor");

var Admin = require("../models/Admin"); //we will check if user is authenticated or not (routes security)


exports.isAuthenticatedUser = catchAssyncErrors(function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.token;

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new ErrorHandler('Login first to access ressource ', 401)));

        case 3:
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(Patient.findById(decoded.id));

        case 6:
          req.user = _context.sent;
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}); //handling users roles

exports.authorizeRoles = function () {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Role(".concat(req.user.role, ") is not allowed"), 403));
    }

    next();
  };
};