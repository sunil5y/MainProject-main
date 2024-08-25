const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrder, getUserOrders } = require('../Controller/orderController');
const auth = require('../Middleware/authMiddleware');
const { authorizeRole } = require('../Middleware/authorizationMiddleware');

router.post('/create', auth, createOrder);
router.get('/', auth, authorizeRole('admin'), getOrders); // Admin only
// router.put('/:orderId', auth, authorizeRole('admin'), updateOrder); // Update order for admin
router.patch('/:orderId/status', auth, authorizeRole('admin'), updateOrder);
router.get('/me', auth, getUserOrders); // Fetch orders for the logged-in user

module.exports = router;
