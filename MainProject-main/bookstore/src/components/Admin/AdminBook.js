// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import Navbar from '../Navbar/NavbarComponent';
// // const AdminBook = () => {
// //   const [bookForm, setBookForm] = useState({
// //     title: '',
// //     author: '',
// //     Price: '',
// //     genre: '',
// //     Description: '',
// //     Publisher:'',
// //   });
// //   const [imageFile, setImageFile] = useState(null);
// //   const [imageUrl, setImageUrl] = useState(null);
// //   const [formError, setFormError] = useState('');
// //   const [success, setSuccess] = useState(false);

// //   const handleBookFormChange = (e) => {
// //     setBookForm({ ...bookForm, [e.target.name]: e.target.value });
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImageFile(file);
// //         setImageUrl(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleBookSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!bookForm.title || !bookForm.author || !bookForm.Publisher || !bookForm.Price || !bookForm.genre || !bookForm.Description || !imageFile) {
// //       setFormError('Please fill in all fields and upload an image.');
// //       return;
// //     }
// //     try {
// //       const formData = new FormData();
// //       formData.append('title', bookForm.title);
// //       formData.append('author', bookForm.author);
// //       formData.append('Publisher', bookForm.Publisher);
// //       formData.append('Price', bookForm.Price);
// //       formData.append('genre', bookForm.genre);
// //       // formData.append('publicationDate', bookForm.publicationDate);
// //       // formData.append('isbn', bookForm.isbn);
// //       formData.append('Description', bookForm.Description);
// //       formData.append('image', imageFile);

// //       const res = await axios.post('http://localhost:1000/api/auth/books', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       console.log('Processing...', res.data);
// //       setFormError(''); // Clear any previous error
// //       setSuccess(true); // Show success message
// //       setBookForm({ title: '', author: '', Price: '', genre: '', Description: '',Publisher:''});
// //       setImageUrl(null);
// //     } catch (err) {
// //       console.error('Error during Process:', err.response ? err.response.data : err.message);
// //       setFormError('Failed');
// //       setSuccess(false); // Hide success message if there's an error
// //     }
// //   };

// //   const closePopup = () => {
// //     setSuccess(false); // Hide success message when popup is closed
// //   };

// //   return (
// //     <div className="relative h-screen">
// //       <div className="absolute w-full z-20">
// //       <Navbar />
// //       </div>
// //       <div className="flex items-center justify-center h-full">
// //         <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg mt-20 h-4/5 w-4/5">
          
// //           <div className='text-center'>
// //             <label className=' font-bold text-gray-700 text-2xl'>Book Store Management</label>
// //           </div>
          
// //           <form onSubmit={handleBookSubmit}>
// //             <div className='flex space-x-10 mt-5'>
// //               <div className='space-y-9 mt-5 ml-16'>
// //                 <label className='flex text-1xl font-medium'>Book Title</label>
// //                 <label className='flex text-1xl font-medium'>Author</label>
// //                 <label className='flex text-1xl font-medium'>Publisher</label>
// //                 <label className='flex text-1xl font-medium'>Price</label>
// //                 <label className='flex text-1xl font-medium'>Genre</label>
// //                 {/* <label className='flex text-1xl font-medium'>Publication Date</label>
// //                 <label className='flex text-1xl font-medium'>ISBN</label> */}
// //                 <label className='flex text-1xl font-medium'>Description</label>
// //               </div>

// //               <div className='space-y-6 mt-7 ml-16'>
// //                 <input name="title" value={bookForm.title} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter book title' />
// //                 <input name="author" value={bookForm.author} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter author' />
// //                 <input name="Publisher" value={bookForm.Publisher} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter Publisher' />
// //                 <input name="Price" value={bookForm.Price} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter price' />
// //                 <input name="genre" value={bookForm.genre} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter genre' />
// //                 {/* <input name="publicationDate" value={bookForm.publicationDate} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='date' placeholder='Enter publication date' />
// //                 <input name="isbn" value={bookForm.isbn} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter ISBN' /> */}
// //                 <textarea name="Description" value={bookForm.Description} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' placeholder='Enter book description' rows="4"></textarea>
// //               </div>

// //               <div className=' pl-36 mt-5'>
// //                 <div className="flex flex-col items-center justify-center">
// //                 <div className="w-72 h-72 border border-gray-600 flex items-center justify-center">
// //                   {imageUrl ? (
// //                     <img src={imageUrl} alt="Uploaded" className="object-cover w-fit h-fit" />
// //                   ) : (
// //                     <p className="text-gray-500">No image uploaded</p>
// //                   )}
// //                 </div>
// //                 <input 
// //                   type="file" 
// //                   accept="image/*" 
// //                   onChange={handleImageChange} 
// //                   className="mt-4"
// //                 />
// //               </div>

// //               <div className='pt-5 space-x-4'>
// //                 <button className="bg-black text-white text-lg px-6 py-1 rounded-lg z-10">Update</button>
// //                 <button className="bg-red-700 text-white text-lg px-6 py-1 rounded-lg z-10">Delete</button>
// //                 <button type="submit" className="bg-black text-white text-lg px-6 py-1 rounded-lg z-10">Add</button>
// //                 <button type="button" className="bg-gray-200 text-red-700 text-lg px-6 py-1 rounded-lg z-10">Reset</button>
// //               </div>

// //               </div>
// //             </div>
// //           </form>

// //           {formError && <p className="text-red-500 text-center mt-5">{formError}</p>}
// //           {success && (
// //             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //               <div className="bg-white p-6 rounded-lg shadow-lg text-center">
// //                 <h3 className="text-2xl font-bold mb-4">Book successfully added</h3>
// //                 <button onClick={closePopup} className="text-center mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Close</button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminBook;
// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from '../Navbar/NavbarComponent';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axiosInstance from "../../Config/axiosConfig";
// import axios from 'axios'; // Imported axios if axiosInstance is not configured

// const AdminBook = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     Price: '',
//     genre: '',
//     Description: '',
//     Publisher:'',
//     bookimage:''
//   });

//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editingBook, setEditingBook] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       bookimage: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("author", formData.author);
//     data.append("Price", formData.Price);
//     data.append("genre", formData.genre);
//     data.append("Description", formData.Description);
//     data.append("Publisher", formData.Publisher);
 
  
//     if (formData.bookimage) {
//       data.append("bookimage", formData.bookimage);
//     }
  
//     try {
//       if (editingBook) {
//         const response = await axiosInstance.patch(`/api/books/${editingBook._id}`, data);
//         toast.success(response.data.msg);
//         setEditingBook(null);
//       } else {
//         const response = await axiosInstance.post("/api/books", data, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         toast.success(response.data.msg);
//         console.log("Book added successfully:", response.data);
//       }
  
//       // Refresh bike list after adding or editing
//       fetchBooks();
//     } catch (error) {
//       console.error("Error adding/updating book:", error);
//       toast.error(error.response?.data?.msg || "An error occurred");
//     }
//   };


//   const handleDelete = async () => {
//     if (!editingBook) return;

//     try {
//       const response = await axiosInstance.delete(`/api/books/${editingBook._id}`);
//       toast.success(response.data.msg);
//       setEditingBook(null);
//       setFormData({
//         title: '',
//         author: '',
//         Price: '',
//         genre: '',
//         Description: '',
//         Publisher:'',
//         bookimage:''
//       });
//       fetchBooks();
//     } catch (error) {
//       console.error("Error deleting bike:", error);
//       toast.error(error.response?.data?.msg || "An error occurred");
//     }
//   };

  

//   const fetchBooks = useCallback(async () => {
//     try {
//       const response = await axios.get(`http://localhost:1000/api/books?search=${searchTerm}`);
//       setBooks(response.data);
//     } catch (error) {
//       console.error('Error fetching bikes:', error);
//     }
//   }, [searchTerm]);

//   useEffect(() => {
//     fetchBooks();
//   }, [fetchBooks]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleEdit = (book) => {
//     setFormData({
//       title: book.title,
//       author: book.author,
//       Price: book.Price,
//       genre: book.genre,
//       Description: book.Description,
//       Publisher: book.Publisher,
//       bookimage: book.bookimage,
//     });
//     setEditingBook(book);
//   };

//   const handleExploreMore = (id) => {
//     navigate(`/modelsDetail/${id}`);
//   };

//   return (
//     <div className="relative h-screen" style={{ backgroundImage: ``, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="absolute w-full z-20">
//         <Navbar />
//       </div>
//       <div className="flex items-center justify-center h-full">
//         {/* Form Section */}
//         <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg mt-20 h-auto w-3/5 ml-4 ">
//           <form onSubmit={handleSubmit}>
//             <div className='flex space-x-10'>
//               <div className='space-y-9 mt-5 ml-16'>
//                 <label className='flex text-1xl font-medium'>Book title</label>
//                 <label className='flex text-1xl font-medium'>Book author</label>
//                 <label className='flex text-1xl font-medium'>Price</label>
//                 <label className='flex text-1xl font-medium'>genre</label>
//                 <label className='flex text-1xl font-medium'>Description</label>
//                 <label className='flex text-1xl font-medium'>Publisher</label>
//                 <label className='flex text-1xl font-medium'>Bookimage</label>
//               </div>

//               <div className='space-y-6 mt-7 ml-16'>
//                 <input name="title" value={formData.title} onChange={handleChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter book title' />
//                 <input name="author" value={formData.author} onChange={handleChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter book author' />
//                 <input name="Price" value={formData.Price} onChange={handleChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter Price' />
//                 <input name="genre" value={formData.genre} onChange={handleChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter genre' />
//                 <input name="Description" value={formData.Description} onChange={handleChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter Description' />
//                 <input name="Publisher" value={formData.Publisher} onChange={handleChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter Publisher' />
//                 <input type="file" name="bookimage" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
//                 <div className="space-x-2">
//                   {/* <button type="submit" className="bg-black text-white text-base px-6 py-1 rounded-lg z-10">{editingBike ? 'Update' : 'Add'}</button> */}

//                   {editingBook && (
//                     <>
//                       <button type="submit" className="bg-black text-white text-base px-6 py-1 rounded-lg z-10">Update</button>
//                       <button type="button" onClick={handleDelete} className="bg-red-600 text-white text-base px-6 py-1 rounded-lg z-10">Delete</button>
//                     </>
//                   )}
//                   {!editingBook && (
//                     <button type="submit" className="bg-black text-white text-base px-6 py-1 rounded-lg z-10">Add</button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Bike List Section */}
//         <div className="flex flex-wrap justify-center space-x-10 mt-12 w-4/5">
//           {books.map((book) => (
//             <div key={book.title} className="flex flex-col items-center">
//               <img
//                 onClick={() => handleExploreMore(book._id)}
//                 src={book.bookimage}
//                 alt={book.title}
//                 className="h-40 z-0 transition-transform transform hover:scale-110"
//               />
//               <label
//                 onClick={() => handleEdit(book)}
//                 className="text-2xl font-bold text-gray-800 mt-2 cursor-pointer"
//               >
//                 {book.title}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminBook;
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/NavbarComponent';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Config/axiosConfig";
import axios from 'axios';

const AdminBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    Price: '',
    genre: '',
    Description: '',
    Publisher: '',
    bookimage: ''
  });

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      bookimage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'bookimage') {
        data.append(key, formData[key]);
      }
    });
  
    if (formData.bookimage) {
      data.append("bookimage", formData.bookimage);
    }
  
    try {
      let response;
      if (editingBook) {
        response = await axiosInstance.patch(`/api/books/${editingBook._id}`, data);
        toast.success("Book updated successfully");
      } else {
        response = await axiosInstance.post("/api/books", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Book added successfully");
      }
      
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        Price: '',
        genre: '',
        Description: '',
        Publisher: '',
        bookimage: ''
      });
      
      fetchBooks();
    } catch (error) {
      console.error("Error adding/updating book:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  const handleDelete = async () => {
    if (!editingBook) return;

    try {
      await axiosInstance.delete(`/api/books/${editingBook._id}`);
      toast.success("Book deleted successfully");
      setEditingBook(null);
      setFormData({
        title: '',
        author: '',
        Price: '',
        genre: '',
        Description: '',
        Publisher: '',
        bookimage: ''
      });
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:1000/api/books?search=${searchTerm}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      Price: book.Price,
      genre: book.genre,
      Description: book.Description,
      Publisher: book.Publisher,
      bookimage: book.bookimage,
    });
    setEditingBook(book);
  };

  const handleExploreMore = (id) => {
    navigate(`/modelsDetail/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16"> {/* Added mt-16 here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['title', 'author', 'Price', 'genre', 'Description', 'Publisher'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Book Image</label>
                <input
                  type="file"
                  name="bookimage"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {editingBook ? 'Update' : 'Add'}
                </button>
                {editingBook && (
                  <button type="button" onClick={handleDelete} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Book List Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Book List</h2>
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {books.map((book) => (
                <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={book.bookimage}
                    alt={book.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handleExploreMore(book._id)}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <button
                      onClick={() => handleEdit(book)}
                      className="mt-2 text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBook;