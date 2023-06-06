"use strict";

var Question = require('../models/Question');

var ErrorHandler = require('../utils/errorHandler');

var catchAssyncErrors = require('../middlewares/catchAssyncErrors');

var APIFeatures = require('../utils/apiFeatures'); //create  a new question  =>/me/question/new


exports.newQuestion = catchAssyncErrors(function _callee(req, res) {
  var _req$body, poster_id, poster_role, poster_name, poster_city, title, description, question;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, poster_id = _req$body.poster_id, poster_role = _req$body.poster_role, poster_name = _req$body.poster_name, poster_city = _req$body.poster_city, title = _req$body.title, description = _req$body.description;
          _context.next = 3;
          return regeneratorRuntime.awrap(Question.create({
            poster_id: poster_id,
            poster_role: poster_role,
            poster_name: poster_name,
            poster_city: poster_city,
            title: title,
            description: description
          })["catch"](function (err) {
            console.log(err);
            res.status(400).json({
              success: false,
              message: 'Question already created'
            });
          }));

        case 3:
          question = _context.sent;
          res.status(201).json({
            success: true,
            question: question
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // get all questions => /me/allQuestions

exports.getAllQuestions = catchAssyncErrors(function _callee2(req, res, next) {
  var questionsCount, resPerPage, apiFeatures, questions, filteredQuestionsCount;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //total number of doctors 
          questionsCount = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Question.countDocuments());

        case 3:
          questionsCount = _context2.sent;
          // console.log("DoctorsCount",doctorsCount);
          //how many Doctors cards to display per page 
          resPerPage = 6;
          apiFeatures = new APIFeatures(Question.find(), req.query); // .search()
          // .filter();

          _context2.next = 8;
          return regeneratorRuntime.awrap(apiFeatures.query);

        case 8:
          questions = _context2.sent;
          console.log("hello , hello");
          filteredQuestionsCount = questions.length;
          apiFeatures.pagination(resPerPage);
          console.log("PQuestionQuerry", questionsCount);
          _context2.next = 15;
          return regeneratorRuntime.awrap(apiFeatures.query.clone());

        case 15:
          questions = _context2.sent;
          res.status(200).json({
            success: true,
            // result: `${filteredDoctorsCount} out of ${doctorsCount} doctors found`,
            resPerPage: resPerPage,
            questions: questions,
            questionsCount: questionsCount,
            filteredQuestionsCount: filteredQuestionsCount
          });
          return _context2.abrupt("return", next(new ErrorHandler('error', 400)));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // get Question by Id:  => /me/question/details/:id

exports.getQuestionById = catchAssyncErrors(function _callee3(req, res, next) {
  var question;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("params ", req.params.id);
          _context3.next = 3;
          return regeneratorRuntime.awrap(Question.findById(req.params.id));

        case 3:
          question = _context3.sent;

          if (question) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new ErrorHandler('Product not found', 404)));

        case 6:
          res.status(200).json({
            succcess: true,
            question: question
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //register response for a  question 

exports.registerResponse = catchAssyncErrors(function _callee4(req, res, next) {
  var responses, count, question;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          responses = [];
          count = 0;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Question.findById(req.body.id));

        case 4:
          question = _context4.sent;

          if (question) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", next(new ErrorHandler('Question not found', 404)));

        case 9:
          responses = question.responses;
          responses.push(req.body.response);
          count = responses.length;

        case 12:
          _context4.next = 14;
          return regeneratorRuntime.awrap(Question.updateOne({
            _id: req.body.id
          }, {
            responses: responses,
            responseCount: count
          }, {
            "new": true,
            runValidators: false,
            useFindAndModify: true
          }));

        case 14:
          question = _context4.sent;
          res.status(200).json({
            success: true,
            question: question,
            responses: responses
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // update a question  =>  me/question/update 

exports.updateQuestion = catchAssyncErrors(function _callee5(req, res, next) {
  var question;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Question.findById(req.body.id));

        case 2:
          question = _context5.sent;

          if (question) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new ErrorHandler('Question not found', 404)));

        case 5:
          _context5.next = 7;
          return regeneratorRuntime.awrap(Question.updateOne({
            _id: req.body.id
          }, {
            description: req.body.content
          }, {
            "new": true,
            runValidators: false,
            useFindAndModify: true
          }));

        case 7:
          question = _context5.sent;
          console.log("the question beeing sent is ", question);
          res.status(200).json({
            success: true,
            question: question
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // delete a question  =>  me/question/delete