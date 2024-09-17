const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCart
//   updateQuantity
} = require('../Controller/cartController');

/**
 * @description Add a bike to the cart
 * @route POST /api/cart/add
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the updated cart
 */
router.post('/add', authMiddleware, addToCart);

/**
 * @description Get the user's cart
 * @route GET /api/cart
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the user's cart
 */
router.get('/', authMiddleware, getCart);

router.put('/update', authMiddleware, updateCart);
router.delete('/remove/:bookId', authMiddleware, removeFromCart);

/**
 * @description Remove a bike from the cart
 * @route DELETE /api/cart/remove
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object confirming removal
 */
// router.delete('/remove', authMiddleware, removeFromCart);

/**
 * @description Update the quantity of a bike in the cart
 * @route PATCH /api/cart/update
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object confirming quantity update
 */
// router.patch('/update', authMiddleware, updateQuantity);

module.exports = router;
