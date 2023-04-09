const  Doctor = require('../models/Doctor');
const ErrorHandler = require('../utils/errorHandler');
const catchAssyncErrors = require('../middlewares/catchAssyncErrors');
const APIFeatures = require('../utils/apiFeatures'); 
// const cloudinary = require('cloudinary'); 





//get all Doctors  =>/doctors ?keyword=DoctorName
exports.getDoctors = catchAssyncErrors(async (req, res, next) => {
    //total number of doctors 
    const doctorsCount = await Doctor.countDocuments();
    console.log("DoctorsCount",doctorsCount);
    
    //how many Doctors cards to display per page 
    const resPerPage = 6;
    const apiFeatures = new APIFeatures(Doctor.find(), req.query)
        // .search()
        // .filter();
    
      
    let doctors= await apiFeatures.query;
    console.log("hello , hello");
    let filteredDoctorsCount = doctors.length;

   apiFeatures.pagination(resPerPage);
   console.log("DoctorsQuerry",doctorsCount);
   
  doctors = await apiFeatures.query.clone();
 
        res.status(200).json({
            success: true,
          // result: `${filteredDoctorsCount} out of ${doctorsCount} doctors found`,
            resPerPage,
            doctors, 
            doctorsCount,
            filteredDoctorsCount 
        })
        return next(new ErrorHandler('error', 400)); 
})