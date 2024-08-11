import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/NavbarComponent';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleCheckout = (id) => {
    navigate(`/checkout/${id}`);
  };

  return (
    <div className="relative h-screen">
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex items-center justify-between h-full">
        <div className="bg-white bg-opacity-75 p-8 rounded-2xl shadow-lg h-64 w-1/3 flex items-center justify-center ml-64 mb-60">
          <div className="absolute top-28 left-72">
          <label className="block text-xl font-bold text-gray-800">Title</label>
            <h2 className="text-3xl font-bold text-gray-800">{book.title || 'N/A'}</h2>
            
            <label className="block text-xl font-bold text-gray-800 mt-3">Author</label>
            <p className="text-2xl text-gray-800">{book.author || 'N/A'}</p>
            
            <label className="block text-xl font-bold text-gray-800 mt-3">Publisher</label>
            <p className="text-2xl text-gray-800">{book.Publisher || 'N/A'}</p>

            <label className="block text-xs font-bold text-gray-800 mt-3">Description</label>
            <label className="block text-sm font-bold text-gray-800">{book.Description || 'N/A'}</label>

            <label className="block text-xl font-bold text-gray-800 mt-3">Price</label>
            <p className="text-2xl font-bold text-gray-800">Rs. {book.Price || 'N/A'}</p>
          </div>

          <div className="absolute top-36 ml-52 text-center space-y-3">
            <label className="block text-2xl font-bold text-gray-700">{book.title || 'N/A'}</label>
            <label className="block text-2xl font-bold text-gray-700">Rs. {book.Price || 'N/A'}</label>
            <button onClick={() => handleCheckout(book._id)} className="bg-red-700 text-white text-xl font-semibold px-7 py-2 rounded-lg z-10">Proceed</button>
          </div>
        </div>
        <img src={book.bookimage} alt="Book Cover" className="h-80 mb-72 mr-28" />
      </div>
    </div>
  );
}

export default CartComponent;
