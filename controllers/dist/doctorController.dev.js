"use strict";

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
          console.log("DoctorsCount", doctorsCount); //how many Doctors cards to display per page 

          resPerPage = 6;
          apiFeatures = new APIFeatures(Doctor.find(), req.query); // .search()
          // .filter();

          _context.next = 8;
          return regeneratorRuntime.awrap(apiFeatures.query);

        case 8:
          doctors = _context.sent;
          console.log("hello , hello");
          filteredDoctorsCount = doctors.length;
          apiFeatures.pagination(resPerPage);
          console.log("DoctorsQuerry", doctorsCount);
          _context.next = 15;
          return regeneratorRuntime.awrap(apiFeatures.query.clone());

        case 15:
          doctors = _context.sent;
          res.status(200).json({
            success: true,
            // result: `${filteredDoctorsCount} out of ${doctorsCount} doctors found`,
            resPerPage: resPerPage,
            doctors: doctors,
            doctorsCount: doctorsCount,
            filteredDoctorsCount: filteredDoctorsCount
          });
          return _context.abrupt("return", next(new ErrorHandler('error', 400)));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
});