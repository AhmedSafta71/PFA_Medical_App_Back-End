const catchAssyncErrors = require('../middlewares/catchAssyncErrors')
const Order= require('../models/PaymentOrder'); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /payment/process
exports.processPayment = catchAssyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'tnd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /stripeapikey
exports.sendStripApi = catchAssyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})
// create new Payemet order => /payment/order/new
exports.newOrder = catchAssyncErrors(async (req, res, next) => {
    const {
        consultationsNumber,
        totalAmount,
        paymentInfo,

    } = req.body;

    const order = await Order.create({
        consultationsNumber,
        totalAmount,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})
//   Get User Payments =>me/payment/orders
exports.myOrders = catchAssyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})


