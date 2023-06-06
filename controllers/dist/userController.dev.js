"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = require('../models/User');

var Doctor = require('../models/Doctor');

var Patient = require('../models/Patient');

var catchAssyncErrors = require('../middlewares/catchAssyncErrors');

var ErrorHandler = require('../utils/errorHandler');

var _require = require('../utils/jwtToken'),
    sendToken = _require.sendToken,
    sendDoctorToken = _require.sendDoctorToken;

var sendEmail = require('../utils/sendEmail');

var cloudinary = require('cloudinary');

var path = require('path');

var crypto = require('crypto');

var _require2 = require('../models/User'),
    removeListener = _require2.removeListener; // Local storage data for register


var storedRegister = {
  userName: '',
  email: '',
  password: '',
  avatar: {}
};

var updateRegisterData = function updateRegisterData(username, email, password, avatar) {
  storedRegister.userName = username;
  storedRegister.email = email;
  storedRegister.password = password;
  storedRegister.avatar = avatar;
}; // register for admin made by postman


exports.registerAdmin = catchAssyncErrors(function _callee(req, res) {
  var file, result, _req$body, userName, email, password, avatar, user;

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
          _req$body = req.body, userName = _req$body.userName, email = _req$body.email, password = _req$body.password;
          avatar = {
            public_id: result.public_id,
            url: result.secure_url
          };
          _context.next = 8;
          return regeneratorRuntime.awrap(User.create({
            userName: userName,
            email: email,
            password: password,
            avatar: {
              public_id: result.public_id,
              url: result.secure_url
            }
          })["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'Admin Already created'
            });
          }));

        case 8:
          user = _context.sent;
          sendToken(user, 200, res);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}); //register user => /register

exports.captureUser = catchAssyncErrors(function _callee2(req, res) {
  var file, result, _req$body2, userName, email, password, avatar;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("entred");
          file = req.body.avatar;
          _context2.next = 4;
          return regeneratorRuntime.awrap(cloudinary.v2.uploader.upload(file, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
          }));

        case 4:
          result = _context2.sent;
          console.log("the result is passed");
          _req$body2 = req.body, userName = _req$body2.userName, email = _req$body2.email, password = _req$body2.password;
          avatar = {
            public_id: result.public_id,
            url: result.secure_url
          };
          console.log("avatar", avatar);
          console.log(avatar);
          updateRegisterData(userName, email, password, avatar); // res.staus(400).json({
          //         success: false,
          // })

          res.status(201).json({
            success: true,
            user: storedRegister
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // registerPatient => register/patient

exports.registerPatient = catchAssyncErrors(function _callee3(req, res) {
  var _req$body3, name, surname, city, gender, age, smoker, height, weight, userName, email, password, avatar, disease, operation, role, patient, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("registerPatient request arrived ");
          _req$body3 = req.body, name = _req$body3.name, surname = _req$body3.surname, city = _req$body3.city, gender = _req$body3.gender, age = _req$body3.age, smoker = _req$body3.smoker, height = _req$body3.height, weight = _req$body3.weight;
          console.log("StoredRegister data", storedRegister);
          userName = storedRegister.userName, email = storedRegister.email, password = storedRegister.password, avatar = storedRegister.avatar;
          disease = req.body['disease[]'];
          operation = req.body['operation[]'];
          role = 'Patient';
          _context3.next = 9;
          return regeneratorRuntime.awrap(Patient.create({
            name: name,
            surname: surname,
            city: city,
            gender: gender,
            age: age,
            smoker: smoker,
            height: height,
            weight: weight,
            disease: disease,
            operation: operation,
            email: email
          })["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'Patient Already created'
            });
          }));

        case 9:
          patient = _context3.sent;
          _context3.next = 12;
          return regeneratorRuntime.awrap(User.create({
            userName: userName,
            email: email,
            password: password,
            avatar: avatar,
            role: role
          })["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'user Already created'
            });
          }));

        case 12:
          user = _context3.sent;
          sendToken(user, 201, res);

        case 14:
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

          if (user) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", next(new ErrorHandler('Invalid Email or Password', 401)));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(user.comparePassword(password));

        case 10:
          isPasswordMatched = _context4.sent;

          if (isPasswordMatched) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt("return", next(new ErrorHandler('Invalid Password', 401)));

        case 13:
          sendToken(user, 200, res);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //logout user => /logOut

exports.logout = catchAssyncErrors(function _callee5(req, res, next) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
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
          return _context5.stop();
      }
    }
  });
}); // register Doctor => register/doctor 

exports.registerDoctor = catchAssyncErrors(function _callee6(req, res) {
  var userName, email, password, avatar, data, soins, i, role, user, doctor;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log("the request parsed inbody ", req.body);
          console.log("the data is", req.body);
          userName = storedRegister.userName, email = storedRegister.email, password = storedRegister.password, avatar = storedRegister.avatar;
          data = {
            Id_Doctor: req.body['doctorData[Id_Doctor]'],
            name: req.body['doctorData[name]'],
            surname: req.body['doctorData[surname]'],
            phone: req.body['doctorData[phone]'],
            speciality: req.body['doctorData[speciality]'],
            description: req.body['doctorData[description]'],
            image: [avatar],
            city: req.body['doctorData[city]'],
            address: req.body['doctorData[address]']
          };
          soins = [];
          i = 0;

          for (key in req.body) {
            if (key.includes("soins")) {
              soins.push(req.body["doctorData[soins][".concat(i, "]")]);
              i++;
            }
          }

          role = 'Doctor';
          _context6.next = 10;
          return regeneratorRuntime.awrap(User.create({
            userName: userName,
            email: email,
            password: password,
            avatar: avatar,
            role: role
          })["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'user Already created'
            });
          }));

        case 10:
          user = _context6.sent;
          _context6.next = 13;
          return regeneratorRuntime.awrap(Doctor.create(_objectSpread({}, data, {
            email: email,
            soins: soins
          }))["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'Doctor Already created'
            });
          }));

        case 13:
          doctor = _context6.sent;
          sendDoctorToken(user, doctor, 200, res);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //Loigin user =>/login

exports.loginUser = catchAssyncErrors(function _callee7(req, res, next) {
  var _req$body5, email, password, user, isPasswordMatched;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body5 = req.body, email = _req$body5.email, password = _req$body5.password; // check if email is entred by user 

          if (!(!email || !password)) {
            _context7.next = 3;
            break;
          }

          return _context7.abrupt("return", next(new ErrorHandler('please  enter your email & your password', 400)));

        case 3:
          _context7.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 5:
          user = _context7.sent;

          if (user) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", next(new ErrorHandler('Invalid Email or Password', 401)));

        case 8:
          _context7.next = 10;
          return regeneratorRuntime.awrap(user.comparePassword(password));

        case 10:
          isPasswordMatched = _context7.sent;

          if (isPasswordMatched) {
            _context7.next = 13;
            break;
          }

          return _context7.abrupt("return", next(new ErrorHandler('Invalid Password', 401)));

        case 13:
          sendToken(user, 200, res);

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //Get currently logged in user details  =>/me

exports.getUserProfile = catchAssyncErrors(function _callee8(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 2:
          user = _context8.sent;
          res.status(200).json({
            succcess: true,
            user: user
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //Forgot Password => /pasword/forgot

exports.forgotPassword = catchAssyncErrors(function _callee9(req, res, next) {
  var user, resetToken, resetUrl, message;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context9.sent;

          if (user) {
            _context9.next = 5;
            break;
          }

          return _context9.abrupt("return", next(new ErrorHandler('user not found with  this email', 404)));

        case 5:
          // Get reset token
          resetToken = user.getResetPasswordToken();
          _context9.next = 8;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 8:
          // Create reset password url
          //check the protocol http or https
          resetUrl = "".concat(req.protocol, "://").concat(req.hostname, ":3000/password/reset/").concat(resetToken);
          message = "Your password reset token is as follow:\n\n".concat(resetUrl, "\n\nIf you have not requested this email, then ignore it.");
          _context9.prev = 10;
          _context9.next = 13;
          return regeneratorRuntime.awrap(sendEmail({
            email: user.email,
            subject: 'DoctoChat Password Recovery',
            message: message
          }));

        case 13:
          res.status(200).json({
            success: true,
            message: "Email sent to: ".concat(user.email)
          });
          _context9.next = 23;
          break;

        case 16:
          _context9.prev = 16;
          _context9.t0 = _context9["catch"](10);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          _context9.next = 22;
          return regeneratorRuntime.awrap(user.save({
            validateBeforeSave: false
          }));

        case 22:
          return _context9.abrupt("return", next(new ErrorHandler(_context9.t0.message, 500)));

        case 23:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[10, 16]]);
}); // Reset Password => /pasword/reset

exports.resetPassword = catchAssyncErrors(function _callee10(req, res, next) {
  var resetPasswordToken, user;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          //hash URL token 
          resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex'); //find user in data base that have the resetToken and the expireDate that is greater than the current date 

          _context10.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            resetPasswordToken: resetPasswordToken //resetPasswordExpire: {$gt: Date.now() }

          }));

        case 3:
          user = _context10.sent;

          if (user) {
            _context10.next = 6;
            break;
          }

          return _context10.abrupt("return", next(new ErrorHandler('password reset is invalid or has been expired ', 404)));

        case 6:
          if (!(req.body.password !== req.body.confirmPassword)) {
            _context10.next = 8;
            break;
          }

          return _context10.abrupt("return", next(new ErrorHandler('password does not match', 400)));

        case 8:
          //setup new Password 
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined; //save user

          _context10.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          sendToken(user, 200, res);

        case 14:
        case "end":
          return _context10.stop();
      }
    }
  });
}); //update Password => password/update

exports.updatePassword = catchAssyncErrors(function _callee11(req, res, next) {
  var user, isMatched;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id).select('+password'));

        case 2:
          user = _context11.sent;
          _context11.next = 5;
          return regeneratorRuntime.awrap(user.comparePassword(req.body.oldPassword));

        case 5:
          isMatched = _context11.sent;

          if (isMatched) {
            _context11.next = 8;
            break;
          }

          return _context11.abrupt("return", next(new ErrorHandler('old password is uncorrect', 400)));

        case 8:
          user.password = req.body.password;
          _context11.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          sendToken(user, 200, res);

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  });
}); //logout user => /logOut

exports.logout = catchAssyncErrors(function _callee12(req, res, next) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
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
          return _context12.stop();
      }
    }
  });
}); //update user Profile => /me/update 

exports.updateProfile = catchAssyncErrors(function _callee13(req, res, next) {
  var userId, newUserData, user;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          console.log("the request is ", req.body);
          userId = req.body.userId;
          newUserData = {
            userName: req.body.userName,
            email: req.body.email,
            avatar: req.body.avatar
          };
          console.log("update user data ", newUserData);
          _context13.next = 6;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, newUserData, {
            "new": true,
            runValidators: true,
            useFindAndModify: false
          }));

        case 6:
          user = _context13.sent;
          res.status(200).json({
            success: true,
            user: user
          });

        case 8:
        case "end":
          return _context13.stop();
      }
    }
  });
}); //update user profile ( admin access only : changing status )=> /admin/user/profile

exports.updateUser = catchAssyncErrors(function _callee14(req, res, next) {
  var newUserData, _user, image_id, _res, result, user;

  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          newUserData = {
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar
          }; //Update avatar 

          if (!(req.body.avatar !== '')) {
            _context14.next = 13;
            break;
          }

          _context14.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 4:
          _user = _context14.sent;
          image_id = _user.avatar.url; //destroy image from cloudinary 

          _context14.next = 8;
          return regeneratorRuntime.awrap(cloudinary.v2.uploader.destroy(image_id));

        case 8:
          _res = _context14.sent;
          _context14.next = 11;
          return regeneratorRuntime.awrap(cloudinary.v2.uploader.upload(req.body.avatar.url, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
          }));

        case 11:
          result = _context14.sent;
          newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
          };

        case 13:
          _context14.next = 15;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, newUserData, {
            "new": true,
            runValidators: true,
            useFindAndModify: false
          }));

        case 15:
          user = _context14.sent;

          if (user) {
            _context14.next = 18;
            break;
          }

          return _context14.abrupt("return", next(new ErrorHandler("User does not found with id :".concat(req.params.id), 404)));

        case 18:
          res.status(200).json({
            success: true,
            user: user
          });

        case 19:
        case "end":
          return _context14.stop();
      }
    }
  });
}); //get all users => /admin/users 

exports.allUsers = catchAssyncErrors(function _callee15(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context15.sent;
          res.status(200).json({
            succes: true,
            users: users
          });

        case 4:
        case "end":
          return _context15.stop();
      }
    }
  });
}); //get users details => /admin/user/:id

exports.getUserDetails = catchAssyncErrors(function _callee16(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 2:
          user = _context16.sent;

          if (user) {
            _context16.next = 5;
            break;
          }

          return _context16.abrupt("return", next(new ErrorHandler("User does not found with id :".concat(req.params.id), 404)));

        case 5:
          res.status(200).json({
            success: true,
            user: user
          });

        case 6:
        case "end":
          return _context16.stop();
      }
    }
  });
}); //delete User => /admin/user/id

exports.deleteUser = catchAssyncErrors(function _callee17(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 2:
          user = _context17.sent;

          if (user) {
            _context17.next = 5;
            break;
          }

          return _context17.abrupt("return", next(new ErrorHandler("User does not found with id :".concat(req.params.id), 404)));

        case 5:
          _context17.next = 7;
          return regeneratorRuntime.awrap(user.remove());

        case 7:
          res.status(200).json({
            success: true,
            message: " User deleted successfully "
          });

        case 8:
        case "end":
          return _context17.stop();
      }
    }
  });
}); //delete all Users => /admin/user/deleteAll

exports.deleteAllUsers = catchAssyncErrors(function _callee18(req, res, next) {
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(User.deleteMany());

        case 2:
          res.status(200).json({
            success: true,
            message: "All Users deleted successfully"
          });

        case 3:
        case "end":
          return _context18.stop();
      }
    }
  });
});