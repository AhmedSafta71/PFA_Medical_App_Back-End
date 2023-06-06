const  Doctor = require('../models/Doctor');
const ErrorHandler = require('../utils/errorHandler');
const catchAssyncErrors = require('../middlewares/catchAssyncErrors');
const APIFeatures = require('../utils/apiFeatures'); 
// const cloudinary = require('cloudinary'); 





//get all Doctors  =>/doctors ?keyword=DoctorName
exports.getDoctors = catchAssyncErrors(async (req, res, next) => {

    //total number of doctors 
    const doctorsCount = await Doctor.countDocuments();

    
    //how many Doctors cards to display per page 
    const resPerPage = 6;
    const apiFeatures = new APIFeatures(Doctor.find(), req.query)
    .search()
    console.log("the request queryStr to handle is ", apiFeatures.queryStr);
    console.log("element ", typeof apiFeatures.queryStr.doctorName );
      
      
    apiFeatures.pagination(resPerPage)
    let doctors= await apiFeatures.query;
    let filteredDoctorsCount = doctors.length;

   
        res.status(200).json({
            success: true,
            resPerPage,
            doctors, 
            doctorsCount,
            filteredDoctorsCount, 
    
        })
        return next(new ErrorHandler('error', 400)); 
})

//Get Doctor by email address
exports.getDoctorProfile = catchAssyncErrors(async (req, res, next) => {

    const doctor = await Doctor.find({email:req.query.email}).exec()
    .catch(err => {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err
        })
    });
    res.status(200).json({
        succcess: true,
        userFile: doctor,
    })
})
//get Doctor by Id   => /doctor/details/:id

exports.getDoctorByID = catchAssyncErrors(async (req, res, next) => {
     console.log("params ", req.params.id); 
    const doctor = await Doctor.findById(req.params.id); 
    if (!doctor) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        succcess: true,
        doctor: doctor
    })
})