"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/userController'),
    loginUser = _require.loginUser,
    registerAdmin = _require.registerAdmin,
    registerDoctor = _require.registerDoctor,
    captureUser = _require.captureUser,
    registerPatient = _require.registerPatient,
    logout = _require.logout,
    getUserProfile = _require.getUserProfile,
    forgotPassword = _require.forgotPassword,
    updatePassword = _require.updatePassword,
    resetPassword = _require.resetPassword,
    updateProfile = _require.updateProfile,
    allUsers = _require.allUsers,
    getUserDetails = _require.getUserDetails,
    updateUser = _require.updateUser,
    deleteUser = _require.deleteUser,
    deleteAllUsers = _require.deleteAllUsers;

var _require2 = require('../middlewares/auth'),
    isAuthenticatedUser = _require2.isAuthenticatedUser,
    authorizeRoles = _require2.authorizeRoles;

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
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, allUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails).put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)["delete"](isAuthenticatedUser, authorizeRoles('admin'), deleteUser);
router.route('/admin/users/deleteAll')["delete"](isAuthenticatedUser, authorizeRoles('admin'), deleteAllUsers);
module.exports = router;