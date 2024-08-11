import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-opacity-90 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-semibold text-white text-lg">BookApp.in</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Home</Link>
            <Link to="/books" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Books</Link>
            <Link to="/cart" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Cart</Link>
            <Link to="/contact" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Contact</Link>
            <Link to="/profile" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Profile</Link>
            <Link to="/login" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Login</Link>
            <Link to="/admin" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Admin</Link>
            <Link to="/adminuser" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">AdminUser</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6 text-white hover:text-green-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-opacity-95">
          <ul>
            <li><Link to="/" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Home</Link></li>
            <li><Link to="/books" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Books</Link></li>
            <li><Link to="/cart" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Cart</Link></li>
            <li><Link to="/contact" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Contact</Link></li>
            <li><Link to="/profile" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Profile</Link></li>
            <li><Link to="/register" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Login</Link></li>
            <li><Link to="/admin" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Admin</Link></li>
            <li><Link to="/adminuser" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">AdminUser</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
