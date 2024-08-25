const mongoose = require('mongoose');
const Order = require('../Models/orderModel');
const Book = require('../Models/bookModel'); // Assuming you have a Bike model

// Create an order (accessible by any authenticated user)
exports.createOrder = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const newOrder = new Order({
      user: mongoose.Types.ObjectId(userId),  // Ensure user is an ObjectId
      book: mongoose.Types.ObjectId(bookId),  // Ensure book is an ObjectId
      status: 'Pending',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Get all orders (admin only)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('book user');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Update Order Status
exports.updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    try {
      // Find the order by ID
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }
  
      // Update the status
      order.status = status;
  
      // Save the updated order
      await order.save();
  
      // Send back the updated order
      return res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  };

// Get orders for the authenticated user
exports.getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('book user');
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error); // Check this log
      res.status(500).json({ error: 'Error fetching orders' });
    }
  };
  
  
