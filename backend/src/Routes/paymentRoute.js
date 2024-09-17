const express = require('express');
const router = express.Router();
const { createCheckout, payment} = require('../Controller/paymentController'); // Adjust the path as needed
const authenticate = require('../Middleware/authMiddleware'); // Adjust the path as needed

router.post('/checkout', authenticate, createCheckout);
router.get('/checkout', authenticate, payment);

module.exports = router;