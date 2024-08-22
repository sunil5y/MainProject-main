import React from 'react';
import HomeImage from './BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import Book from '../Home/Book.png';
import User from './User.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleBooks = () => navigate('/adminbook');
  const handleUsers = () => navigate('/adminuser');
  const handleOrders = () => navigate('/adminorder');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url(${HomeImage})` }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-evenly min-h-screen pt-20 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          { title: "Books", image: Book, onClick: handleBooks },
          { title: "Users", image: User, onClick: handleUsers },
          { title: "Reports", image: Book, onClick: handleOrders }
        ].map((item, index) => (
          <motion.div
            key={index}
            className='w-full md:w-72 h-72 m-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden'
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div 
              className="h-full flex flex-col items-center justify-center cursor-pointer"
              onClick={item.onClick}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="h-3/5 object-contain mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <motion.span 
                className='text-2xl font-bold text-white'
                whileHover={{ scale: 1.1 }}
              >
                {item.title}
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;