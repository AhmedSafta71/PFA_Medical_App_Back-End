"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/payementController'),
    processPayment = _require.processPayment,
    sendStripApi = _require.sendStripApi,
    newOrder = _require.newOrder,
    myOrders = _require.myOrders;

var _require2 = require('../middlewares/auth'),
    isAuthenticatedUser = _require2.isAuthenticatedUser,
    AuthorizedRoles = _require2.AuthorizedRoles;

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapikey').get(isAuthenticatedUser, sendStripApi);
router.route('/payment/order/new').post(isAuthenticatedUser, newOrder);
router.route('/me/payment/orders').get(myOrders);
module.exports = router;