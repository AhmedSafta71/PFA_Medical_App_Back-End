"use strict";

var User = require('../models/User');

var Doctor = require('../models/Doctor');

var Patient = require('../models/Patient');

var catchAssyncErrors = require('../middlewares/catchAssyncErrors');

var ErrorHandler = require('../utils/errorHandler');

var sendToken = require('../utils/jwtToken');

var sendEmail = require('../utils/sendEmail');

var cloudinary = require('cloudinary');

var path = require('path');

var cryptos = require('crypto'); //register user => /register


exports.registerUser = catchAssyncErrors(function _callee(req, res) {
  var file, result, _req$body, name, email, password, role, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          file = req.body.avatar.url;
          _context.next = 3;
          return regeneratorRuntime.awrap(cloudinary.v2.uploader.upload(file, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
          }));

        case 3:
          result = _context.sent;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: password,
            avatar: {
              public_id: result.public_id,
              url: result.secure_url
            },
            role: role
          })["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'user Already created'
            });
          }));

        case 7:
          user = _context.sent;
          sendToken(user, 200, res);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}); // register Doctor => register/doctor 

exports.registerDoctor = catchAssyncErrors(function _callee2(req, res) {
  var _req$body2, Id_Doctor, name, surname, email, password, number, ville, address, phone, speciality, description, soins, avatar, doctor;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, Id_Doctor = _req$body2.Id_Doctor, name = _req$body2.name, surname = _req$body2.surname, email = _req$body2.email, password = _req$body2.password, number = _req$body2.number, ville = _req$body2.ville, address = _req$body2.address, phone = _req$body2.phone, speciality = _req$body2.speciality, description = _req$body2.description, soins = _req$body2.soins, avatar = _req$body2.avatar;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Doctor.create({
            Id_Doctor: Id_Doctor,
            name: name,
            surname: surname,
            email: email,
            password: password,
            number: number,
            ville: ville,
            address: address,
            phone: phone,
            speciality: speciality,
            description: description,
            soins: soins,
            avatar: avatar
          })["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'Doctor Already created'
            });
          }));

        case 3:
          doctor = _context2.sent;
          res.status(201).json({
            succcess: true,
            doctor: doctor
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // register Patient => register/patient

exports.registerPatient = catchAssyncErrors(function _callee3(req, res) {
  var _req$body3, name, surname, email, avatar, password, height, width, gender, smoker, diseases, patient;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body3 = req.body, name = _req$body3.name, surname = _req$body3.surname, email = _req$body3.email, avatar = _req$body3.avatar, password = _req$body3.password, height = _req$body3.height, width = _req$body3.width, gender = _req$body3.gender, smoker = _req$body3.smoker, diseases = _req$body3.diseases;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Patient.create({
            Id_Doctor: Id_Doctor,
            name: name,
            surname: surname,
            number: number,
            ville: ville,
            address: address,
            phone: phone,
            speciality: speciality,
            description: description,
            soins: soins,
            avatar: {
              public_id: result.public_id,
              url: result.secure_url
            }
          })["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'Doctor Already created'
            });
          }));

        case 3:
          patient = _context3.sent;
          res.status(201).json({
            succcess: true,
            doctor: doctor
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //Loigin user =>/login

exports.loginUser = catchAssyncErrors(function _callee4(req, res, next) {
  var _req$body4, email, password, user, isPasswordMatched;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body4 = req.body, email = _req$body4.email, password = _req$body4.password; // check if email is entred by user 

          if (!(!email || !password)) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", next(new ErrorHandler('please  enter your email & your password', 400)));

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 5:
          user = _context4.sent;
          console.log(user);

          if (user) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", next(new ErrorHandler('Invalid Email or Password', 401)));

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(user.comparePassword(password));

        case 11:
          isPasswordMatched = _context4.sent;
          console.log(isPasswordMatched);

          if (isPasswordMatched) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", next(new ErrorHandler('Invalid Password', 401)));

        case 15:
          sendToken(user, 200, res);

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //Get currently logged in user details  =>/me

exports.getUserProfile = catchAssyncErrors(function _callee5(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 2:
          user = _context5.sent;
          res.status(200).json({
            succcess: true,
            user: user
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Forgot Password => /pasword/forgot

exports.forgotPassword = catchAssyncErrors(function _callee6(req, res, next) {
  var user, resetToken, resetUrl, message;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context6.sent;

          if (user) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new ErrorHandler('user not found with  this email', 404)));

        case 5:
          // Get reset token
          resetToken = user.getResetPasswordToken();
          _context6.next = 8;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 8:
          // Create reset password url
          //check the protocol http or https
          resetUrl = "".concat(req.protocol, "://").concat(req.get('host'), "/password/reset/").concat(resetToken);
          message = "Your password reset token is as follow:\n\n".concat(resetUrl, "\n\nIf you have not requested this email, then ignore it.");
          _context6.prev = 10;
          _context6.next = 13;
          return regeneratorRuntime.awrap(sendEmail({
            email: user.email,
            subject: 'e-commerce Password Recovery',
            message: message
          }));

        case 13:
          res.status(200).json({
            success: true,
            message: "Email sent to: ".concat(user.email)
          });
          _context6.next = 23;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](10);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          _context6.next = 22;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 22:
          return _context6.abrupt("return", next(new ErrorHandler(_context6.t0.message, 500)));

        case 23:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[10, 16]]);
}); // Reset Password => /pasword/reset

exports.resetPassword = catchAssyncErrors(function _callee7(req, res, next) {
  var resetPasswordToken, user;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          //hash URL token 
          resetPasswordToken = cryptos.createHash('sha256').update(req.params.token).digest('hex'); //find user in data base that have the resetToken and the expireDate that is greater than the current date 

          _context7.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            resetPasswordToken: resetPasswordToken //resetPasswordExpire: {$gt: Date.now() }

          }));

        case 3:
          user = _context7.sent;

          if (user) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", next(new ErrorHandler('password reset is invalid or has been expired ', 404)));

        case 6:
          if (!(req.body.password !== req.body.confirmPassword)) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", next(new ErrorHandler('password does not match', 400)));

        case 8:
          //setup new Password 
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined; //save user

          _context7.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          sendToken(user, 200, res);

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //update Password => password/update

exports.updatePassword = catchAssyncErrors(function _callee8(req, res, next) {
  var user, isMatched;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('+password'));

        case 2:
          user = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(user.comparePassword(req.body.oldPassword));

        case 5:
          isMatched = _context8.sent;

          if (isMatched) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", next(new ErrorHandler('old password is uncorrect', 400)));

        case 8:
          user.password = req.body.password;
          _context8.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          sendToken(user, 200, res);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //logout user => /logOut

exports.logout = catchAssyncErrors(function _callee9(req, res, next) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
          });
          res.status(200).json({
            success: true,
            message: 'Logged out'
          });

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //update user Profile => /me/update 

exports.updateProfile = catchAssyncErrors(function _callee10(req, res, next) {
  var newUserData, user;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          newUserData = {
            name: req.body.name,
            email: req.body.email
          };
          _context10.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(path.req.user.id, newUserData, {
            "new": true,
            runValidators: true,
            useFindAndModify: false
          }));

        case 3:
          user = _context10.sent;
          res.status(200).json({
            success: true,
            user: user
          });

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
}); //update user profile ( admin access only : changing status )=> /admin/user/profile

exports.updateUser = catchAssyncErrors(function _callee11(req, res, next) {
  var newUserData, _user, image_id, _res, _result, user;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            avatar: req.body.avatar
          }; //Update avatar 

          if (!(req.body.avatar !== '')) {
            _context11.next = 13;
            break;
          }

          _context11.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 4:
          _user = _context11.sent;
          image_id = _user.avatar.url; //destroy image from cloudinary 

          _context11.next = 8;
          return regeneratorRuntime.awrap(cloudinary.v2.uploader.destroy(image_id));

        case 8:
          _res = _context11.sent;
          _context11.next = 11;
          return regeneratorRuntime.awrap(cloudinary.v2.uploader.upload(req.body.avatar.url, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
          }));

        case 11:
          _result = _context11.sent;
          newUserData.avatar = {
            public_id: _result.public_id,
            url: _result.secure_url
          };

        case 13:
          _context11.next = 15;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, newUserData, {
            "new": true,
            runValidators: true,
            useFindAndModify: false
          }));

        case 15:
          user = _context11.sent;

          if (user) {
            _context11.next = 18;
            break;
          }

          return _context11.abrupt("return", next(new ErrorHandler("User does not found with id :".concat(req.params.id), 404)));

        case 18:
          res.status(200).json({
            success: true,
            user: user
          });

        case 19:
        case "end":
          return _context11.stop();
      }
    }
  });
}); //get all users => /admin/users 

exports.allUsers = catchAssyncErrors(function _callee12(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context12.sent;
          res.status(200).json({
            succes: true,
            users: users
          });

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  });
}); //get users details => /admin/user/:id

exports.getUserDetails = catchAssyncErrors(function _callee13(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 2:
          user = _context13.sent;

          if (user) {
            _context13.next = 5;
            break;
          }

          return _context13.abrupt("return", next(new ErrorHandler("User does not found with id :".concat(req.params.id), 404)));

        case 5:
          res.status(200).json({
            success: true,
            user: user
          });

        case 6:
        case "end":
          return _context13.stop();
      }
    }
  });
}); //delete User => /admin/user/id

exports.deleteUser = catchAssyncErrors(function _callee14(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 2:
          user = _context14.sent;

          if (user) {
            _context14.next = 5;
            break;
          }

          return _context14.abrupt("return", next(new ErrorHandler("User does not found with id :".concat(req.params.id), 404)));

        case 5:
          _context14.next = 7;
          return regeneratorRuntime.awrap(user.remove());

        case 7:
          res.status(200).json({
            success: true,
            message: " User deleted successfully "
          });

        case 8:
        case "end":
          return _context14.stop();
      }
    }
  });
}); //delete all Users => /admin/user/deleteAll

exports.deleteAllUsers = catchAssyncErrors(function _callee15(req, res, next) {
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(User.deleteMany());

        case 2:
          res.status(200).json({
            success: true,
            message: "All Users deleted successfully"
          });

        case 3:
        case "end":
          return _context15.stop();
      }
    }
  });
});