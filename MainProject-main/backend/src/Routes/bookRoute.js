const express = require('express');
const router = express.Router();

const authMiddleware = require('../Middleware/authMiddleware');
const { authorizeRole } = require('../Middleware/authorizationMiddleware');
const { bookimage } = require('../Middleware/uploadMiddleware');
const {
  createBook,
  updateBook,
  // deleteBike,
  getBook,
  getBooks
} = require('../Controller/bookController');

/**
 * @description Create a new bike
 * @route POST /api/bikes
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the created bikes
 */
router.post('/', authMiddleware, authorizeRole('admin'), bookimage.single('bookimage'), createBook);

/**
 * @description Update an existing bike
 * @route PUT /api/bikes/:id
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the updated bikes
 */
router.patch('/:id', authMiddleware, authorizeRole('admin'), bookimage.single('bookImage'), updateBook);

/**
 * @description Delete a bike
 * @route DELETE /api/bikes/:id
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object confirming deletion
 */
// router.delete('/:id', authMiddleware, authorizeRole('admin'), deleteBike);

/**
 * @description Get a single bike by ID
 * @route GET /api/bikes/:id
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the bike data
 */
router.get('/:id', getBook);

/**
 * @description Get all bikes
 * @route GET /api/bikes
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing an array of bikes
 */
router.get('/', getBooks);

module.exports = router;