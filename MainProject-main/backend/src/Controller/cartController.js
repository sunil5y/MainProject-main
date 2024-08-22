// const Cart = require('../Models/cartModel');
// const Book = require('../Models/bookModel');
// // const User = require('../Models/userModel');
// // const domain = "http://localhost:5000";

// // Helper function to send error responses
// const sendErrorResponse = (res, error) => {
//   console.log(error);
//   res.status(500).json({ msg: error.message });
// };

// // Add bike to cart
// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id; // If user is Authenticated
//     const { bookId } = req.body;

//     // Check if the bike exists
//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ msg: 'Book not found' });
//     }

//     // Find or create a cart for the user
//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       cart = new Cart({ user: userId, books: [], title: [] });
//     }

//     // Check if the book is already in the cart
//     const existingBook = cart.books.find(item => item.book.toString() === bookId);
//     if (existingBook) {
//       // Update quantity if book already exists
//       existingBook.quantity += 1;
//     } else {
//       // Add new book to cart
//       cart.books.push({ book: bookId, quantity: 1 });
//     }

//     await cart.save();
//     res.status(200).json({ msg: 'Book added to cart', cart });
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

// // Get cart details for a user
// const getCart = async (req, res) => {
//     try {
//       const userId = req.user._id; // Assuming you get the user ID from the request (e.g., via middleware)
//       const cart = await Cart.findOne(req.params.id).populate('books.book');
  
//       if (!cart) {
//         return res.status(404).json({ msg: 'Cart not found' });
//       }
  
//       res.status(200).json(cart);
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   };
  

// // // Remove bike from cart (optional)
// // const removeFromCart = async (req, res) => {
// //   try {
// //     const userId = req.user.id; // Assuming user is authenticated
// //     const { bikeId } = req.body;

// //     const cart = await Cart.findOne({ user: userId });
// //     if (!cart) {
// //       return res.status(404).json({ msg: 'Cart not found' });
// //     }

// //     // Remove bike from cart
// //     cart.bikes = cart.bikes.filter(item => item.bike.toString() !== bikeId);
// //     await cart.save();

// //     res.status(200).json({ msg: 'Bike removed from cart', cart });
// //   } catch (error) {
// //     sendErrorResponse(res, error);
// //   }
// // };

// // // Update bike quantity in cart (optional)
// // const updateQuantity = async (req, res) => {
// //   try {
// //     const userId = req.user.id; // Assuming user is authenticated
// //     const { bikeId, quantity } = req.body;

// //     const cart = await Cart.findOne({ user: userId });
// //     if (!cart) {
// //       return res.status(404).json({ msg: 'Cart not found' });
// //     }

// //     const bike = cart.bikes.find(item => item.bike.toString() === bikeId);
// //     if (!bike) {
// //       return res.status(404).json({ msg: 'Bike not found in cart' });
// //     }

// //     bike.quantity = quantity;
// //     await cart.save();

// //     res.status(200).json({ msg: 'Quantity updated', cart });
// //   } catch (error) {
// //     sendErrorResponse(res, error);
// //   }
// // };

// module.exports = {
//   addToCart,
//   getCart,
// //   removeFromCart,
// //   updateQuantity
// };
const Cart = require('../models/cartModel');
const Book = require('../Models/bookModel'); // Assuming you have a Book model

exports.addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id; // Assuming you have middleware that sets req.user

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Cart exists for user
      let itemIndex = cart.books.findIndex(p => p.book.toString() === bookId);

      if (itemIndex > -1) {
        // Book exists in the cart, update the quantity
        cart.books[itemIndex].quantity += 1;
      } else {
        // Book does not exists in cart, add new item
        cart.books.push({ book: bookId, quantity: 1 });
      }

      cart = await cart.save();
      return res.status(201).json({ success: true, cart });
    } else {
      // No cart for user, create new cart
      const newCart = await Cart.create({
        user: userId,
        books: [{ book: bookId, quantity: 1 }]
      });

      return res.status(201).json({ success: true, cart: newCart });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Failed to add book to cart. Please try again.' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('books.book');
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch cart. Please try again.' });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { books } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Update each book in the cart
    for (let bookItem of books) {
      let itemIndex = cart.books.findIndex(p => p.book.toString() === bookItem.book._id);
      if (itemIndex > -1) {
        // Update existing item
        cart.books[itemIndex].quantity = bookItem.quantity;
        cart.books[itemIndex].quality = bookItem.quality;
        cart.books[itemIndex].totalPrice = bookItem.totalPrice;
      }
    }

    cart = await cart.save();
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ success: false, message: 'Failed to update cart. Please try again.' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    let itemIndex = cart.books.findIndex(p => p.book.toString() === bookId);

    if (itemIndex > -1) {
      cart.books.splice(itemIndex, 1);
    } else {
      return res.status(404).json({ success: false, message: 'Book not found in cart' });
    }

    cart = await cart.save();
    return res.status(200).json({ success: true, cart, message: 'Book removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ success: false, message: 'Failed to remove book from cart. Please try again.' });
  }
};

// Additional methods can be added here (e.g., removeFromCart, updateQuantity, etc.)