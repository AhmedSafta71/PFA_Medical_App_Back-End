const Doctor = require('../models/Doctor'); 
const  Notice= require('../models/Notice'); 
const connectDatabase= require('../config/database'); 
const doctors = require('../data/doctors.json'); 
connectDatabase();
const seedDoctors= async()=>{
    try{
        await Doctor.deleteMany(); 
        console.log("All Doctors are deleted successfully");
        await Doctor.insertMany(doctors); 
        console.log("All Doctors are inserted successfully");
        //Force the process to exit quickly  even though there are still assynchronous operations pending
        process.exit(); 
     } catch(error){
            console.log(error.message); 
            process.exit(); 
        }
    }

    const seedNotice= async()=>{
        try{
            await Notice.deleteMany(); 
            console.log("All Doctors are deleted successfully");
            await Doctor.insertMany(doctors); 
            console.log("All Doctors are inserted successfully");
            //Force the process to exit quickly  even though there are still assynchronous operations pending
            process.exit(); 
         } catch(error){
                console.log(error.message); 
                process.exit(); 
            }
        }

    
    seedDoctors(); 
    // seedNotice(); 
