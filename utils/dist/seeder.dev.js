"use strict";

var Doctor = require('../models/Doctor');

var Notice = require('../models/Notice');

var connectDatabase = require('../config/database');

var doctors = require('../data/doctors.json');

connectDatabase();

var seedDoctors = function seedDoctors() {
  return regeneratorRuntime.async(function seedDoctors$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Doctor.deleteMany());

        case 3:
          console.log("All Doctors are deleted successfully");
          _context.next = 6;
          return regeneratorRuntime.awrap(Doctor.insertMany(doctors));

        case 6:
          console.log("All Doctors are inserted successfully"); //Force the process to exit quickly  even though there are still assynchronous operations pending

          process.exit();
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0.message);
          process.exit();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var seedNotice = function seedNotice() {
  return regeneratorRuntime.async(function seedNotice$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Notice.deleteMany());

        case 3:
          console.log("All Doctors are deleted successfully");
          _context2.next = 6;
          return regeneratorRuntime.awrap(Doctor.insertMany(doctors));

        case 6:
          console.log("All Doctors are inserted successfully"); //Force the process to exit quickly  even though there are still assynchronous operations pending

          process.exit();
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);
          process.exit();

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

seedDoctors(); // seedNotice();