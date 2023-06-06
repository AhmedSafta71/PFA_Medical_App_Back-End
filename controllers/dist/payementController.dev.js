"use strict";

var catchAssyncErrors = require('../middlewares/catchAssyncErrors');

var Order = require('../models/PaymentOrder');

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Process stripe payments   =>   /payment/process


exports.processPayment = catchAssyncErrors(function _callee(req, res, next) {
  var paymentIntent;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'tnd',
            metadata: {
              integration_check: 'accept_a_payment'
            }
          }));

        case 2:
          paymentIntent = _context.sent;
          res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Send stripe API Key   =>   /stripeapikey

exports.sendStripApi = catchAssyncErrors(function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.status(200).json({
            stripeApiKey: process.env.STRIPE_API_KEY
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // create new Payemet order => /payment/order/new

exports.newOrder = catchAssyncErrors(function _callee3(req, res, next) {
  var _req$body, consultationsNumber, totalAmount, paymentInfo, order;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, consultationsNumber = _req$body.consultationsNumber, totalAmount = _req$body.totalAmount, paymentInfo = _req$body.paymentInfo;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Order.create({
            consultationsNumber: consultationsNumber,
            totalAmount: totalAmount,
            paymentInfo: paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
          }));

        case 3:
          order = _context3.sent;
          res.status(200).json({
            success: true,
            order: order
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //   Get User Payments =>me/payment/orders

exports.myOrders = catchAssyncErrors(function _callee4(req, res, next) {
  var orders;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Order.find({
            user: req.user.id
          }));

        case 2:
          orders = _context4.sent;
          res.status(200).json({
            success: true,
            orders: orders
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});