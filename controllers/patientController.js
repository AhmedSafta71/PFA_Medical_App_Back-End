const Patient= require('../models/Patient');
const catchAssyncErrors = require('../middlewares/catchAssyncErrors'); 
// get Patient By Email => /patient/profile

exports.getPatientProfile = catchAssyncErrors(async (req, res, next) => {
    console.log("Get the patient here",req.query.email);
    
    // cont query 
    const patient = await Patient.find({ email:req.query.email}).exec()
    .catch(err => {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err
        })
    });
    res.status(200).json({
        succcess: true,
        userFile: patient,
    })
})