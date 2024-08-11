const Book = require("../Models/bookModel");
const domain = "http://localhost:1000";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

// Create a new book (Admin Only)
const createBook = async (req, res) => {
  try {
    const {
      bookimage,
      title,
      author,
      Publisher,
      Description,
      Price,
      genre
    } = req.body;
    let bookData = {
      bookimage,
      title,
      author,
      Publisher,
      Description,
      Price,
      genre
    };

    if (req.file) {
      const bookimage = `${domain}/uploads/books/${req.file.filename}`;
      bookData.bookimage = bookimage;
    }

    const book = new Book(bookData); // Corrected this line
    await book.save();

    res.status(201).json({
      msg: "Book added successfully",
      book: book,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update a product (Admin Only)
const updateBook = async (req, res) => {
  try {
    const {
      bookimage,
      title,
      author,
      Publisher,
      Description,
      Price,
      genre
    } = req.body;
    let updateData = {
      bookimage,
      title,
      author,
      Publisher,
      Description,
      Price,
      genre
    };

    if (req.file) {
      const bikeImage = `${domain}/uploads/bikes/${req.file.filename}`;
      updateData.bikeImage = bikeImage;
    }

    const bike = await Bike.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!bike) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({
      msg: "Bike's information updated successfully",
      bike: bike,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// // Get all products (Public) 
const getBooks = async (req, res) => {
  try {
    const { search, sort } = req.query;
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    let books = await Book.find(query);

    if (sort) {
      const sortOrder = sort === "asc" ? 1 : -1;
      books = books.sort((a, b) => (a.price - b.price) * sortOrder);
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all products (Public) ////////------------Search
const searchBooks = async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  let books = await Book.find(query);

  if (sort) {
    const sortOrder = sort === "asc" ? 1 : -1;
    books = books.sort((a, b) => (a.price - b.price) * sortOrder);
  }

  res.json(books);
};

// Get all products (Public) and filter by category
const getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.categoryId });
    res.status(200).json(books);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Get a single product by ID (Public)
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// // Delete a product (Admin Only)
// const deleteBike = async (req, res) => {
//   try {
//     const bike = await Bike.findByIdAndDelete(req.params.id);

//     if (!bike) {
//       return res.status(404).json({ msg: "Bike not found" });
//     }

//     res
//       .status(200)
//       .json({ msg: "Bike deleted successfully", success: true });
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

module.exports = {
  createBook,
  updateBook,
  getBooks,
  searchBooks,
  getBook,
  // deleteBook,
};
