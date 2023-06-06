"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/questionController'),
    newQuestion = _require.newQuestion,
    getAllQuestions = _require.getAllQuestions,
    registerResponse = _require.registerResponse,
    getQuestionById = _require.getQuestionById,
    updateQuestion = _require.updateQuestion;

router.route('/me/question/new').post(newQuestion);
router.route('/me/allQuestions').get(getAllQuestions);
router.route('/me/question/details/:id').get(getQuestionById);
router.route('/me/doctor/question/newResponse').put(registerResponse);
router.route('/me/patient/question/update').put(updateQuestion);
module.exports = router;