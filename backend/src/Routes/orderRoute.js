const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrder, getUserOrders, deleteOrder } = require('../Controller/orderController');
const auth = require('../Middleware/authMiddleware');
const { authorizeRole } = require('../Middleware/authorizationMiddleware');

router.post('/create', auth, createOrder);
router.get('/', auth, authorizeRole('admin'), getOrders); // Admin only
router.patch('/:orderId/status', auth, authorizeRole('admin'), updateOrder);
router.get('/me', auth, getUserOrders); // Fetch orders for the logged-in user

// Add the delete route
router.delete('/:orderId', auth, deleteOrder); // User can delete their own order

module.exports = router;