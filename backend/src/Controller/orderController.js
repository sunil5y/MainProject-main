const mongoose = require('mongoose');
const Order = require('../Models/orderModel');
const Book = require('../Models/bookModel'); // Assuming you have a Book model

// Create an order (accessible by any authenticated user)
exports.createOrder = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;
    const profileId = req.profile.id;
    // const cartId = req.cart.id;

    // Check if bike exists
    const book = await Book.findById(book);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Create new order
    const newOrder = new Order({
      user: mongoose.Types.ObjectId(userId),  // Ensure user is an ObjectId
      book: mongoose.Types.ObjectId(bookId),  // Ensure book is an ObjectId
      profile: mongoose.Types.ObjectId(profileId),
      // cart: mongoose.Types.ObjectId(cartId), 

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
    const orders = await Order.find().populate('book user profile');
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
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).populate('book user profile');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find and delete the order
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
};