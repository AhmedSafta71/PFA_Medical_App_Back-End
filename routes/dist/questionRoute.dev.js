"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/questionController'),
    newQuestion = _require.newQuestion;

router.route('/me/question/new').get(newQuestion);
module.exports = router;