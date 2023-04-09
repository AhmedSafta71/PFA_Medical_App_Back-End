"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/doctorController'),
    getDoctors = _require.getDoctors;

router.route('/doctors').get(getDoctors);
module.exports = router;