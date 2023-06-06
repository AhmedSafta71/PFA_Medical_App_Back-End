"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Doctor = require('../models/Doctor');

var ErrorHandler = require('../utils/errorHandler');

var catchAssyncErrors = require('../middlewares/catchAssyncErrors');

var APIFeatures = require('../utils/apiFeatures'); // const cloudinary = require('cloudinary'); 
//get all Doctors  =>/doctors ?keyword=DoctorName


exports.getDoctors = catchAssyncErrors(function _callee(req, res, next) {
  var doctorsCount, resPerPage, apiFeatures, doctors, filteredDoctorsCount;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Doctor.countDocuments());

        case 2:
          doctorsCount = _context.sent;
          //how many Doctors cards to display per page 
          resPerPage = 6;
          apiFeatures = new APIFeatures(Doctor.find(), req.query).search();
          console.log("the request queryStr to handle is ", apiFeatures.queryStr);
          console.log("element ", _typeof(apiFeatures.queryStr.doctorName));
          apiFeatures.pagination(resPerPage);
          _context.next = 10;
          return regeneratorRuntime.awrap(apiFeatures.query);

        case 10:
          doctors = _context.sent;
          filteredDoctorsCount = doctors.length;
          res.status(200).json({
            success: true,
            resPerPage: resPerPage,
            doctors: doctors,
            doctorsCount: doctorsCount,
            filteredDoctorsCount: filteredDoctorsCount
          });
          return _context.abrupt("return", next(new ErrorHandler('error', 400)));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Get Doctor by email address

exports.getDoctorProfile = catchAssyncErrors(function _callee2(req, res, next) {
  var doctor;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Doctor.find({
            email: req.query.email
          }).exec()["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: err
            });
          }));

        case 2:
          doctor = _context2.sent;
          res.status(200).json({
            succcess: true,
            userFile: doctor
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //get Doctor by Id   => /doctor/details/:id

exports.getDoctorByID = catchAssyncErrors(function _callee3(req, res, next) {
  var doctor;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("params ", req.params.id);
          _context3.next = 3;
          return regeneratorRuntime.awrap(Doctor.findById(req.params.id));

        case 3:
          doctor = _context3.sent;

          if (doctor) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new ErrorHandler('Product not found', 404)));

        case 6:
          res.status(200).json({
            succcess: true,
            doctor: doctor
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});