const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
 
  },
  expiration: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true,
  },

}, );

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;