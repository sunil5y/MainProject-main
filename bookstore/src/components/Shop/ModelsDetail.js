// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../Navbar/NavbarComponent';
// import BackImage from './BackImage.jpg';

// const ModelsDetail = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:1000/api/books/${id}`);
//         setBook(response.data);
//       } catch (error) {
//         console.error('Error fetching book details:', error);
//       }
//     };

//     fetchBookDetails();
//   }, [id]);

//   const handleAddToCart = async (bookId) => {
//     try {
//       const response = await axios.post('http://localhost:1000/api/cart/add', { bookId }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (response.status === 200) {
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
//       }
//     } catch (error) {
//       console.error('Error adding book to cart:', error);
//     }
//   };

//   const handleBuyNow = (id) => {
//     navigate(`/checkout/${id}`);
//   };

//   if (!book) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BackImage})` }}>
//       <div className="absolute w-full z-20">
//         <Navbar />
//       </div>
//       <div className="flex items-center justify-center h-full p-4 md:p-8">
//         <div className="flex flex-col md:flex-row w-full md:w-4/5 bg-white bg-opacity-75 p-6 md:p-12 rounded-lg shadow-lg space-y-6 md:space-y-0 md:space-x-8">
//           <img
//             src={book.bookimage}
//             alt={book.title}
//             className="h-64 w-full md:w-1/2 object-contain rounded-lg"
//           />
//           <div className="flex flex-col justify-between w-full">
//             <div className="space-y-4">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//                 {book.title || 'N/A'}
//               </h2>
//               <p className="text-lg md:text-xl text-gray-600">
//                 Description: {book.Description || 'N/A'}
//               </p>
//               <p className="text-lg md:text-xl text-gray-600">
//                 Author: {book.author || 'N/A'}
//               </p>
//               <p className="text-lg md:text-xl text-gray-600">
//                 Publisher: {book.Publisher || 'N/A'}
//               </p>
//               <p className="text-lg md:text-xl text-gray-600">
//                 Genre: {book.genre || 'N/A'}
//               </p>
//               <p className="text-2xl md:text-3xl font-bold text-gray-800">
//                 Rs. {book.Price || 'N/A'}
//               </p>
//             </div>

//             <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">
//               <button
//                 onClick={() => handleAddToCart(book._id)}
//                 className="bg-gray-300 text-lg md:text-2xl font-semibold px-4 md:px-6 py-2 rounded-lg border-2 border-red-500 hover:bg-gray-400"
//               >
//                 Add to Cart
//               </button>
//               <button
//                 onClick={() => handleBuyNow(book._id)}
//                 className="bg-red-700 text-white text-lg md:text-2xl font-semibold px-4 md:px-6 py-2 rounded-lg hover:bg-red-800"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showSuccessMessage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h3 className="text-xl md:text-2xl font-bold mb-4">Successfully added to Cart</h3>
//             <button
//               onClick={() => setShowSuccessMessage(false)}
//               className="text-center mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ModelsDetail;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/NavbarComponent';
import BackImage from './BackImage.jpg';

const ModelsDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setErrorMessage('Failed to load book details. Please try again later.');
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddToCart = async (bookId) => {
    if (!localStorage.getItem('token')) {
      setErrorMessage('You must be logged in to add items to cart.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:1000/api/cart/add',
        { bookId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.data.success) {
        setShowSuccessMessage(true);
        setErrorMessage('');
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        setErrorMessage(response.data.message || 'Failed to add book to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding book to cart:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };
  
  const handleBuyNow = (id) => {
    navigate(`/checkout/${id}`);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${BackImage})` }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex items-center justify-center h-full p-4 md:p-8">
        <div className="flex flex-col md:flex-row w-full md:w-4/5 bg-white bg-opacity-75 p-6 md:p-12 rounded-lg shadow-lg space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={book.bookimage}
            alt={book.title}
            className="h-64 w-full md:w-1/2 object-contain rounded-lg"
          />
          <div className="flex flex-col justify-between w-full">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {book.title || 'N/A'}
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Description: {book.Description || 'N/A'}
              </p>
              <p className="text-lg md:text-xl text-gray-600">
                Author: {book.author || 'N/A'}
              </p>
              <p className="text-lg md:text-xl text-gray-600">
                Publisher: {book.Publisher || 'N/A'}
              </p>
              <p className="text-lg md:text-xl text-gray-600">
                Genre: {book.genre || 'N/A'}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-800">
                Rs. {book.Price || 'N/A'}
              </p>
            </div>

            <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">
              <button
                onClick={() => handleAddToCart(book._id)}
                className="bg-gray-300 text-lg md:text-2xl font-semibold px-4 md:px-6 py-2 rounded-lg border-2 border-red-500 hover:bg-gray-400"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(book._id)}
                className="bg-red-700 text-white text-lg md:text-2xl font-semibold px-4 md:px-6 py-2 rounded-lg hover:bg-red-800"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Successfully added to Cart</h3>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-center mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-red-600">Error</h3>
            <p>{errorMessage}</p>
            <button
              onClick={() => setErrorMessage('')}
              className="text-center mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelsDetail;