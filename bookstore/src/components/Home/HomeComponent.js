import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackImage from './BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import BookImage from './Book.png';

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate('/login');
  };

  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${BackImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center h-full relative">
        <div className="absolute font-bold z-10 text-6xl pb-36">
          <span className="bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent">Innovative Learning</span>
        </div>
        
        <img src={BookImage} alt="Home Bike" className="h-1/2 z-0" />

        <div className='text-center ml-60 mr-60'>
          <p className="text-base text-center md:text-xl leading-relaxed text-white">
            Discover our extensive range of courses and resources designed to help you excel in your personal and professional growth. Join our vibrant community today and start your journey towards mastery!
          </p>
        </div>
        
        <button onClick={handleExploreMore} className=" bg-gradient-to-r from-yellow-500 to-pink-500 text-white rounded-full px-6 py-3 transition-transform transform hover:scale-105 duration-300 shadow-lg mt-4 z-10">Get Started</button>
      </div>
    </div>
  );
};

export default HomeComponent;
