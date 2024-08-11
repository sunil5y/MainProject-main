import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import BackImage from './BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import { useNavigate } from 'react-router-dom';

const ModelsComponent = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleExploreMore = (id) => {
    navigate(`/modelsDetail/${id}`);
  };

  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${BackImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg mt-20 h-4/5 w-4/5">
          <div className="flex justify-center items-center mb-5">
            <div className="flex items-center w-full max-w-md">
              <input type="text" placeholder="Search..." className="w-full px-4 py-2 border-2 border-gray-300 rounded-l-md focus:outline-none focus:border-transparent" value={searchTerm} onChange={handleSearchChange} />
              <button type="button" className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white rounded-md px-4 py-2 transition-transform transform hover:scale-105 duration-300 shadow-lg" onClick={fetchBooks}>Search</button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-10 mt-5">
            {books.map((book) => (
              <div
                key={book._id}
                className="flex flex-col items-center p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
                style={{
                  border: "2px solid transparent",
                  backgroundImage:
                    "linear-gradient(white, white), radial-gradient(circle at top left, #ff7e5f, #feb47b)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "content-box, border-box",
                }}
              >
                <img
                  onClick={() => handleExploreMore(book._id)}
                  src={book.bookimage}
                  alt={book.Price}
                  className="h-40 z-0 rounded-lg transition-transform transform hover:scale-110"
                />
                <label className="text-2xl font-bold text-gray-800 mt-2"> Rs.{book.Price}</label>
                <p className="text-lg text-gray-600 mt-1">{book.author}</p> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelsComponent;
