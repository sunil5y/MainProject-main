// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-opacity-90 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-none'}`}>
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <span className="font-semibold text-white text-lg">BookApp.in</span>
//             </Link>
//           </div>
//           <div className="hidden md:flex items-center space-x-4">
//             <Link to="/" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Home</Link>
//             <Link to="/books" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Books</Link>
//             <Link to="/cart" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Cart</Link>
//             <Link to="/contact" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Contact</Link>
//             <Link to="/profile" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Profile</Link>
//             <Link to="/login" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Login</Link>
//             <Link to="/admin" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Admin</Link>
//             <Link to="/adminuser" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">AdminUser</Link>
//           </div>
//           <div className="md:hidden flex items-center">
//             <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
//               <svg className="w-6 h-6 text-white hover:text-green-500"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path d="M4 6h16M4 12h16m-7 6h7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="md:hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-opacity-95">
//           <ul>
//             <li><Link to="/" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Home</Link></li>
//             <li><Link to="/books" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Books</Link></li>
//             <li><Link to="/cart" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Cart</Link></li>
//             <li><Link to="/contact" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Contact</Link></li>
//             <li><Link to="/profile" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Profile</Link></li>
//             <li><Link to="/register" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Login</Link></li>
//             <li><Link to="/admin" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Admin</Link></li>
//             <li><Link to="/adminuser" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">AdminUser</Link></li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import { toggle } from "../../features/navbar/nabvarSlice";

// function Navbar() {
//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.authSlice);
//   console.log(authState);
//   const isOpen = useSelector((state) => state.navbar.isOpen);

//   const handleLogout = () => {
//     dispatch(logout());
//     // Add any additional logout logic if needed
//   };

//   return (
//     <nav className="absolute top-0 left-0 w-full bg-transparent">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex flex-row space-x-96 justify-between items-center py-4">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <span className="font-semibold text-white text-lg">Book.in</span>
//             </Link>
//           </div>
//           <div className="hidden md:flex items-center space-x-1">
//             <Link to="/" className="py-4 px-2 text-white font-semibold">Home</Link>
//             <Link to="/books" className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Books</Link>

//             {authState.isAuthenticated && authState.userRole === 'admin' && (
//               <Link to="/admin" className="py-2 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Dashboard</Link>
//             )}
            
//             {authState.isAuthenticated && authState.userRole !== 'admin' && (
//               <>
//                 <Link to="/cart" className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Cart</Link>
//                 <Link to="/contact" className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Contact</Link>
//               </>
//             )}
            
//             <Link to="/profile" className="py-2 px-2 text-white font-semibold hover:text-green-500 transition duration-300">Profile</Link>

//             {authState.isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="py-2 px-2 font-medium text-white bg-red-600 rounded hover:bg-red-500 transition duration-300"
//               >
//                 Log Out
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//           <div className="md:hidden flex items-center">
//             <button className="outline-none mobile-menu-button" onClick={() => dispatch(toggle())}>
//               <svg className="w-6 h-6 text-white hover:text-green-500"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path d="M4 6h16M4 12h16m-7 6h7" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 bg-opacity-75">
//           <ul className="">
//             <li><Link to="/" className="block text-sm px-2 py-4 text-white font-semibold">Home</Link></li>
//             <li><Link to="/books" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Book</Link></li>
            
//             {authState.isAuthenticated && authState.userRole === 'admin' && (
//               <li><Link to="/admin" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Dashboard</Link></li>
//             )}
//             {authState.isAuthenticated && authState.userRole !== 'admin' && (
//               <>
//                 <li><Link to="/cart" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Cart</Link></li>
//                 <li><Link to="/contact" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Contact</Link></li>
//               </>
//             )}
//             <li><Link to="/profile" className="block text-sm px-2 py-4 text-white hover:bg-green-500 transition duration-300">Profile</Link></li>
//             {authState.isAuthenticated ? (
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="block text-sm px-2 py-4 text-white hover:bg-red-500 transition duration-300"
//                 >
//                   Log Out
//                 </button>
//               </li>
//             ) : (
//               <>
//                 <li><Link to="/login" className="block text-sm px-2 py-4 text-white hover:bg-red-500 transition duration-300">Log In</Link></li>
//                 <li><Link to="/register" className="block text-sm px-2 py-4 text-white hover:bg-red-500 transition duration-300">Sign Up</Link></li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../features/auth/authSlice";
import { toggle } from "../../features/navbar/nabvarSlice";


function Navbar() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className={`fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-opacity-90 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-none'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-semibold text-white text-lg">BookApp.in</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Home</Link>
          

            {authState.isAuthenticated && authState.userRole === 'admin' && (
              <>
              <Link to="/books" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Books</Link>
              <Link to="/admin" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Admin</Link>
              <Link to="/profile" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Profile</Link>
              </>
            )}

            {authState.isAuthenticated && authState.userRole !== 'admin' && (
              <>
              <Link to="/books" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Books</Link>
              <Link to="/cart" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Cart</Link>
              <Link to="/contact" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Contact</Link>
              <Link to="/profile" className="py-2 px-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Profile</Link>

              </>
            )}

            

            {authState.isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="py-2 px-4 font-medium text-white bg-red-600 rounded hover:bg-red-500 transition duration-300"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-4 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 font-medium text-white bg-red-500 rounded hover:bg-red-400 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => dispatch(toggle())}>
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

            {authState.isAuthenticated && authState.userRole === 'admin' && (
              <li><Link to="/admin" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Admin</Link></li>
            )}

            {authState.isAuthenticated && authState.userRole !== 'admin' && (
              <>
                <li><Link to="/cart" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Cart</Link></li>
                <li><Link to="/contact" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Contact</Link></li>
              </>
            )}

            <li><Link to="/profile" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-green-500 transition duration-300">Profile</Link></li>

            {authState.isAuthenticated ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-red-500 transition duration-300"
                >
                  Log Out
                </button>
              </li>
            ) : (
              <>
                <li><Link to="/login" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-red-500 transition duration-300">Log In</Link></li>
                <li><Link to="/register" className="block px-2 py-4 h-10 flex items-center text-white font-semibold hover:text-red-500 transition duration-300">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
