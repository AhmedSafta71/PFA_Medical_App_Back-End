"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/patientController'),
    getPatientProfile = _require.getPatientProfile;

var _require2 = require('../controllers/userController'),
    registerPatient = _require2.registerPatient;

router.route('/me/patient/profile').get(getPatientProfile);
router.route('/register/patient').post(registerPatient);
module.exports = router;