const Checkout = require('../Models/paymentModel');
const Product = require('../Models/bookModel');
const User = require('../Models/authUserModel');
const Order = require('../Models/orderModel');

const createCheckout = async (req, res) => {
  try {
    // Extract data from the request body
    const { book, name, number, expiration, cvv } = req.body;
    const userId = req.user.id;

    // Create a new checkout entry
    const checkout = new Checkout({
      user: userId,
      book,
      name,
      number,
      expiration,
      cvv
    });

    // Save the checkout entry to the database
    await checkout.save();

    // After successful checkout, create a new Order
    const order = new Order({
      user: userId,
      book: book, // The book purchased
      status: 'Pending', // Initial status of the order
    });

    await order.save(); // Save the order in the Order database

    // Respond with the created checkout
    res.status(201).json({
      message: 'Checkout created successfully',
      checkout
    });
  } catch (error) {
    // Handle any errors
    console.error('Error creating checkout:', error);
    res.status(500).json({
      message: 'Error creating checkout',
      error: error.message
    });
  }
};

const payment = async (req, res) => {
  try {
    // Log to verify the request is reaching this point
    console.log('Fetching all payments...');
    
    const payments = await Checkout.find()
      .populate('user', 'name email') // Populate user details
      .populate('book', 'title'); // Populate book details
    
    // Log the fetched payments for debugging
    console.log('Payments fetched:', payments);
    
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ msg: error.message });
  }
};



module.exports = {
  createCheckout,
  payment
};


