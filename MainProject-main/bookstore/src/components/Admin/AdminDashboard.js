import React from 'react';
import HomeImage from './BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import Book from '../Home/Book.png';
import User from './User.png';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleBooks = () => {
    navigate('/adminbook');
  };

  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${HomeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex items-center justify-evenly h-full relative">
        <div className='h-60 w-72 text-2xl text-center font-bold bg-gray-300 rounded-2xl bg-opacity-70 shadow-lg shadow-slate-950'>
          <img src={Book} onClick={handleBooks} alt="Home Bike" className="h-3/4 z-0 mb-2 transition-transform transform hover:scale-110 cursor-pointer" />
          <label className='text-xl text-gray-700'>Books</label>
        </div>

        <div className='h-60 w-72 text-2xl text-center font-bold bg-gray-300 rounded-2xl bg-opacity-70 shadow-lg shadow-slate-950'>
          <img src={User} alt="Home User" className="h-3/5 z-0 mb-2 mt-9 ml-16 transition-transform transform hover:scale-110" />
          <label className='text-xl text-gray-700'>Users</label>
        </div>

        <div className='h-60 w-72 text-2xl text-center font-bold bg-gray-300 rounded-2xl bg-opacity-70 shadow-lg shadow-slate-950'>
          <img src={Book} alt="Home Bike" className="h-3/4 z-0 mb-2 transition-transform transform hover:scale-110" />
          <label className='text-xl text-gray-700'>Books</label>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
