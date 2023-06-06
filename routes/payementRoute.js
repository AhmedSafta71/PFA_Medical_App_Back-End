const express = require('express') ; 
const router = express.Router();
const {processPayment,sendStripApi,newOrder,myOrders} =require('../controllers/payementController'); 
const {isAuthenticatedUser,AuthorizedRoles}=require('../middlewares/auth'); 


router.route('/payment/process').post(isAuthenticatedUser,processPayment); 
router.route('/stripeapikey').get(isAuthenticatedUser,sendStripApi); 
router.route('/payment/order/new').post(isAuthenticatedUser,newOrder); 
router.route('/me/payment/orders').get(myOrders); 
module.exports = router;