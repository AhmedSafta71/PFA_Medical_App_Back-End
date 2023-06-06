"use strict";

var express = require('express');

var passport = require('passport');

var router = express.Router();
var CLIENT_HOME_PAGE_URL = "https://localhost:3000";

var _require = require('../controllers/userController'),
    loginUser = _require.loginUser,
    forgotPassword = _require.forgotPassword,
    registerAdmin = _require.registerAdmin,
    registerDoctor = _require.registerDoctor,
    captureUser = _require.captureUser,
    logout = _require.logout,
    getUserProfile = _require.getUserProfile,
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
router.route('/auth/google').get(passport.authenticate('google', {
  scope: ['email', 'Profile', 'userName']
}));
router.route('/auth/google/callback').get(passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: CLIENT_HOME_PAGE_URL,
  session: false
}));
router.route('/register/admin').post(registerAdmin);
router.route('/register').post(captureUser);
router.route('/register/doctor').post(registerDoctor);
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