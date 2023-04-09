const User=require('../models/User');
const Doctor= require('../models/Doctor');
const Patient= require('../models/Patient');


const catchAssyncErrors = require('../middlewares/catchAssyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary');
const path = require('path');
const crypto= require('crypto')


// Local storage data for register
let storedRegister= {userName:'',email:'',password:'',avatar:{}};
 const updateRegisterData=(username,email,password,avatar)=>{
    storedRegister.userName=username ; 
    storedRegister.email=email; 
    storedRegister.password=password ; 
    storedRegister.avatar=avatar ; 
 } 
 
// register for admin made by postman
 exports.registerAdmin = catchAssyncErrors(async (req, res) => {
    const file = req.body.avatar.url;
        const result = await cloudinary.v2.uploader.upload(file, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })
      
    let {
        userName,
        email,
        password,
    } = req.body;

    let avatar={
        public_id: result.public_id,
        url: result.secure_url};

  
    const user = await User.create({
        userName,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }, 
    
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'Admin Already created'
        });
    })

    sendToken(user, 200, res);
})



//register user => /register
exports.captureUser = catchAssyncErrors(async (req, res) => {
console.log("entred");
    const file = req.body.avatar;
        const result = await cloudinary.v2.uploader.upload(file, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

  console.log("the result is passed"); 
    let {
        userName,
        email,
        password,
    } = req.body;

    let avatar={
        public_id: result.public_id,
        url: result.secure_url};
    console.log("avatar",avatar); 
    console.log(avatar);

    updateRegisterData(userName,email,password,avatar);
 
    // res.staus(400).json({
    //         success: false,
    // })
    
    res.status(201).json({
        success: true,
        user:storedRegister
    })
    console.log("success!!")
})


// registerPatient => register/patient

exports.registerPatient = catchAssyncErrors(async (req, res) => {

    console.log("the request body", req.body); 
    
    let {
        name,
        surname, 
        city,
        gender,  
        age, 
        smoker,
        height, 
        weight,
        disease, 
        operation,
    } = req.body;
    console.log("StoredRegister data  ", storedRegister); 
    const {userName, email, password, avatar}= storedRegister;
    
    const role= 'Patient';

    console.log("Data sent to patient ",{ name,surname, 
    city,
    gender,  
    age, 
    smoker,
    height, 
    weight,
    disease, 
    operation,
    email} ); 
    const patient= await Patient.create({
        name,
        surname, 
        city,
        gender,  
        age, 
        smoker,
        height, 
        weight,
        disease, 
        operation,
        email,   
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'Patient Already created'
        });
    })
    const user = await User.create({
        userName,
        email,
        password,
        avatar, 
        role
        
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'user Already created'

        });
    })
   
    sendToken(user,201,res);
})

//Loigin user =>/login
exports.loginUser = catchAssyncErrors(async (req, res, next) => {
const {
    email,
    password
} = req.body;
// check if email is entred by user 
if (!email || !password) {
    return next(new ErrorHandler('please  enter your email & your password', 400));
}
//finding user in dataBase
const user = await User.findOne({
    email
}).select('+password');

if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
}
//checks if pasword is correct or not 

const isPasswordMatched = await user.comparePassword(password);

if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Password', 401));
}
sendToken(user, 200, res);

});

//logout user => /logOut
exports.logout = catchAssyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})


// register Doctor => register/doctor 
exports.registerDoctor = catchAssyncErrors(async (req, res) => {
    let {
        Id_Doctor,
        name,
        surname, 
        phone,  
        speciality, 
        description,
        soin, 
        city,
        address, 
    } = req.body;
    
    const {userName, email, password, avatar}= storedRegister;
    const role= 'Doctor';
        
    const user = await User.create({
        userName,
        email,
        password,
        avatar, 
        role
        
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'user Already created'
        });
    })
    
    const doctor= await Doctor.create({
        Id_Doctor,
        name,
        surname,
        email, 
        city,
        address,
        phone,  
        speciality, 
        description,
        soin,
        avatar
        
    }).catch(err => {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'Doctor Already created'
        });
    })

    sendToken(user, 201, res);
})

//Loigin user =>/login
exports.loginUser = catchAssyncErrors(async (req, res, next) => {
const {
    email,
    password
} = req.body;
// check if email is entred by user 
if (!email || !password) {
    return next(new ErrorHandler('please  enter your email & your password', 400));
}
//finding user in dataBase
const user = await User.findOne({
    email
}).select('+password');

if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
}
//checks if pasword is correct or not 

const isPasswordMatched = await user.comparePassword(password);

if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Password', 401));
}
sendToken(user, 200, res);

});

//Get currently logged in user details  =>/me
exports.getUserProfile = catchAssyncErrors(async (req, res, next) => {
    console.log("get user id ", req); 
    // if condition search which user is Logged in 
    console.log("search user id ", req.user); 
    const user = await User.findById(req.user.id);
    res.status(200).json({
        succcess: true,
        userlogin
    })
})
//Forgot Password => /pasword/forgot
exports.forgotPassword = catchAssyncErrors(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    })
    
   if (!user) {
        return next(new ErrorHandler('user not found with  this email', 404));
    }

    // Get reset token

        const resetToken = user.getResetPasswordToken();
    await user.save({
        validateBeforeSave: false
    });

    // Create reset password url
    //check the protocol http or https
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'DoctoChat Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({
            validateBeforeSave: false
        });

        return next(new ErrorHandler(error.message, 500))
    }

})

// Reset Password => /pasword/reset

exports.resetPassword = catchAssyncErrors(async (req, res, next) => {
    //hash URL token 

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    //find user in data base that have the resetToken and the expireDate that is greater than the current date 
    const user = await User.findOne({
        resetPasswordToken,
        //resetPasswordExpire: {$gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('password reset is invalid or has been expired ', 404))
    }

    //make sure that that the password and the new paassword does not confirm
    if (req.body.password !== req.body.confirmPassword) {

        return next(new ErrorHandler('password does not match', 400))
    }

    //setup new Password 
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    //save user
    await user.save();
    sendToken(user, 200, res)

})





//update Password => password/update
exports.updatePassword = catchAssyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');
    //check previous user pasword 
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler('old password is uncorrect', 400))
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res)
})



//logout user => /logOut
exports.logout = catchAssyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})


//update user Profile => /me/update 
exports.updateProfile = catchAssyncErrors(async (req, res, next) => {
    console.log("the request is ",req.body);
    const userId= req.body.userId;
    const newUserData = {
        userName: req.body.userName,
        email: req.body.email,
        avatar:req.body.avatar,
    }
    console.log("update user data ",newUserData); 
  
 
    const user = await User.findByIdAndUpdate(userId, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//update user profile ( admin access only : changing status )=> /admin/user/profile
exports.updateUser = catchAssyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email, 
        avatar: req.body.avatar,
    }
 

    //Update avatar 
    if (req.body.avatar !== '') {

        const user = await User.findById(req.user.id)
        const image_id = user.avatar.url;
        //destroy image from cloudinary 
        const res = await cloudinary.v2.uploader.destroy(image_id);
        //reset an image 
        const result = await cloudinary.v2.uploader.upload(req.body.avatar.url, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }

    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    if (!user) {
        return next(new ErrorHandler(`User does not found with id :${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    })
})


//get all users => /admin/users 
exports.allUsers = catchAssyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        succes: true,
        users
    })
})
//get users details => /admin/user/:id
exports.getUserDetails = catchAssyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id :${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        user,
    })
})
//delete User => /admin/user/id
exports.deleteUser = catchAssyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id :${req.params.id}`, 404));
    }
    //remove avatar 
    await user.remove();

    res.status(200).json({
        success: true,
        message: " User deleted successfully "
    })
})

//delete all Users => /admin/user/deleteAll
exports.deleteAllUsers = catchAssyncErrors(async (req, res, next) => {
    await User.deleteMany();

    res.status(200).json({
        success: true,
        message: "All Users deleted successfully"
    })
})