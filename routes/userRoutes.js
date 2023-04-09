const express = require('express');
const router = express.Router();
const {
    loginUser,
    registerAdmin,
    registerDoctor, 
    captureUser,
    registerPatient,
    logout,
    getUserProfile,
    forgotPassword,
    updatePassword,
    resetPassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
    deleteAllUsers
} = require('../controllers/userController');
const {
    isAuthenticatedUser,
    authorizeRoles, 
} = require('../middlewares/auth'); 


router.route('/login').post(loginUser);
router.route('/register/admin').post(registerAdmin);
router.route('/register').post(captureUser);
router.route('/register/doctor').post(registerDoctor);
router.route('/register/patient').post(registerPatient);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me/update').put(isAuthenticatedUser,updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, allUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser); 
    router.route('/admin/users/deleteAll').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteAllUsers);

module.exports = router;