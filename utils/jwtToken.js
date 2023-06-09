const  COOKIE_EXPIRES_TIME= 7; 
// Create and send token and save in the cookie.
const sendToken= (user, statusCode, res)=>{
    // create token    
    const token = user.getJwtToken() 
    //cookie options 
    const options ={
        expires: new Date(Date.now()+ COOKIE_EXPIRES_TIME*24*60*1000 ), 
        httpOnly: true,
        withCredentials:true
        
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user,
    })
}
// send token for dooctor 
const sendDoctorToken= (user,doctor, statusCode, res)=>{
    console.log("the doctor us recieved",doctor);
    // create token    
    const token = user.getJwtToken() 
    //cookie options 
    const options ={
        expires: new Date(Date.now()+ COOKIE_EXPIRES_TIME*24*60*1000 ), 
        httpOnly: true,
        withCredentials:true
        
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token, 
        doctor:doctor,
        user,
       
    })
}


module.exports = {sendToken,sendDoctorToken};
