"use strict";

var Patient = require('../models/Patient');

var catchAssyncErrors = require('../middlewares/catchAssyncErrors'); // get Patient By Email => /patient/profile


exports.getPatientProfile = catchAssyncErrors(function _callee(req, res, next) {
  var patient;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Get the patient here", req.query.email); // cont query 

          _context.next = 3;
          return regeneratorRuntime.awrap(Patient.find({
            email: req.query.email
          }).exec()["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: err
            });
          }));

        case 3:
          patient = _context.sent;
          res.status(200).json({
            succcess: true,
            userFile: patient
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});