"use strict";

var nodeMailer = require('nodemailer');

var sendEmail = function sendEmail(options) {
  var transporter, message;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //creating a Transporter(SMTP)
          transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD
            }
          }); //message schema

          message = {
            from: "".concat(process.env.SMTP_FROM_NAME, " <").concat(process.env.SMTP_FROM_EMAIL, ">"),
            to: options.email,
            subject: options.subject,
            text: options.message
          };
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(transporter.sendMail(message));

        case 5:
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](2);
          console.log("error while sending the email", _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 7]]);
};

module.exports = sendEmail;