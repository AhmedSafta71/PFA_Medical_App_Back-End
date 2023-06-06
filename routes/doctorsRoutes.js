const express= require('express'); 
const router= express.Router(); 
const {getDoctors,getDoctorProfile,getDoctorByID } =require('../controllers/doctorController')

router.route('/doctors').get(getDoctors);
router.route('/doctor/details/:id').get(getDoctorByID);
router.route('/me/doctor/profile').get(getDoctorProfile );

module.exports= router; 