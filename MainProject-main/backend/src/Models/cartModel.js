// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   books: [
//     {
//       book: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Book',
//         required: true
//       },
//       quantity: {
//         type: Number,
//         default: 1,
//         required: true
//       }
//     }
//   ]
// });

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    totalPrice: {
      type: Number,
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
