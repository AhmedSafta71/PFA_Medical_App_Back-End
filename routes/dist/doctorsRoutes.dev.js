"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/doctorController'),
    getDoctors = _require.getDoctors,
    getDoctorProfile = _require.getDoctorProfile,
    getDoctorByID = _require.getDoctorByID;

router.route('/doctors').get(getDoctors);
router.route('/doctor/details/:id').get(getDoctorByID);
router.route('/me/doctor/profile').get(getDoctorProfile);
module.exports = router;