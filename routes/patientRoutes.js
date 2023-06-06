const express = require('express') ; 
const router = express.Router();
const {getPatientProfile} =require('../controllers/patientController'); 
const {registerPatient} =require('../controllers/userController');

router.route('/me/patient/profile').get(getPatientProfile); 
router.route('/register/patient').post(registerPatient);

module.exports = router;