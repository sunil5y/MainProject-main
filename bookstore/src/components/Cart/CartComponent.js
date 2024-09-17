// import React, { useEffect, useState } from 'react';
// import HomeImage from './Home.png';
// import Navbar from '../Navbar/NavbarComponent';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CartComponent = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // To handle any errors
//   const token = localStorage.getItem('token'); // Retrieve token from localStorage

//   useEffect(() => {
//     const fetchCartDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/cart/', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach the token in the request headers
//           },
//         });
//         setCart(response.data); // Assuming response.data contains the cart object
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cart details:', error);
//         setError('Failed to load cart details.');
//         setLoading(false);
//       }
//     };

//     fetchCartDetails();
//   }, [token]);

//   const handleCheckout = (bookId) => {
//     navigate(`/checkout/${bookId}`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!cart || cart.books.length === 0) {
//     return (
//       <div
//         className="relative h-screen"
//         style={{
//           backgroundImage: `url(${HomeImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute w-full z-20">
//           <Navbar />
//         </div>
//         <div className="flex items-center justify-center h-full">
//           <div className="bg-white bg-opacity-75 p-8 rounded-2xl shadow-lg w-2/3">
//             <p>No items in the cart.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="relative h-screen"
//       style={{
//         backgroundImage: `url(${HomeImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="absolute w-full z-20">
//         <Navbar />
//       </div>
//       <div className="flex items-center justify-center h-full">
//         <div className="bg-white bg-opacity-75 p-8 rounded-2xl shadow-lg w-3/4">
//           {cart.books.map((item) => (
//             <div key={item.book._id} className="flex items-center border-b border-gray-300 py-4">
//               <div className="flex-1">
//                 <label className="block text-lg font-bold text-gray-800">{item.book.title}</label>
//                 <label className="block text-lg font-bold text-gray-700">Rs. {item.book.price || 'N/A'}</label>
//                 <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
//                 <button
//                   onClick={() => handleCheckout(item.book._id)}
//                   className="block bg-red-700 text-white text-lg font-semibold px-4 py-2 mt-4 rounded-lg"
//                 >
//                   Proceed
//                 </button>
//               </div>
//               <div className="text-right">
//                 <img
//                   src={item.book.bookimage}
//                   alt={item.book.title}
//                   className="h-52 w-auto object-cover mr-4"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartComponent;
// import React, { useEffect, useState } from 'react';
// import HomeImage from './Home.png';
// import Navbar from '../Navbar/NavbarComponent';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CartComponent = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState({ books: [] }); // Initialize with empty books array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // To handle any errors
//   const token = localStorage.getItem('token'); // Retrieve token from localStorage

//   useEffect(() => {
//     const fetchCartDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/cart/', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach the token in the request headers
//           },
//         });
//         setCart(response.data.cart || { books: [] }); // Ensure cart structure
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cart details:', error);
//         setError('Failed to load cart details.');
//         setLoading(false);
//       }
//     };

//     fetchCartDetails();
//   }, [token]);

//   const handleCheckout = (bookId) => {
//     navigate(`/checkout/${bookId}`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!cart || cart.books.length === 0) {
//     return (
//       <div
//         className="relative h-screen"
//         style={{
//           backgroundImage: `url(${HomeImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute w-full z-20">
//           <Navbar />
//         </div>
//         <div className="flex items-center justify-center h-full">
//           <div className="bg-white bg-opacity-75 p-8 rounded-2xl shadow-lg w-2/3">
//             <p>No items in the cart.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="relative h-screen"
//       style={{
//         backgroundImage: `url(${HomeImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="absolute w-full z-20">
//         <Navbar />
//       </div>
//       <div className="flex items-center justify-center h-full">
//         <div className="bg-white bg-opacity-75 p-8 rounded-2xl shadow-lg w-3/4">
//           {cart.books.map((item) => (
//             <div key={item.book._id} className="flex items-center border-b border-gray-300 py-4">
//               <div className="flex-1">
//                 <label className="block text-lg font-bold text-gray-800">{item.book.title}</label>
//                 <label className="block text-lg font-bold text-gray-700">Rs. {item.book.Price || 'N/A'}</label>
//                 <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
//                 <button
//                   onClick={() => handleCheckout(item.book._id)}
//                   className="block bg-red-700 text-white text-lg font-semibold px-4 py-2 mt-4 rounded-lg"
//                 >
//                   Proceed
//                 </button>
//               </div>
//               <div className="text-right">
//                 <img
//                   src={item.book.bookimage}
//                   alt={item.book.title}
//                   className="h-52 w-auto object-cover mr-4"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartComponent;


// jjdj
// import React, { useEffect, useState } from 'react';
// import HomeImage from './Home.png';
// import Navbar from '../Navbar/NavbarComponent';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CartComponent = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState({ books: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     fetchCartDetails();
//   }, [token]);

//   const fetchCartDetails = async () => {
//     try {
//       const response = await axios.get('http://localhost:1000/api/cart/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCart(response.data.cart || { books: [] });
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching cart details:', error);
//       setError('Failed to load cart details.');
//       setLoading(false);
//     }
//   };

//   const handleCheckout = (bookId) => {
//     navigate(`/checkout/${bookId}`);
//   };

//   const handleQualityChange = async (bookId, change) => {
//     try {
//       const updatedCart = {
//         ...cart,
//         books: cart.books.map(item => {
//           if (item.book._id === bookId) {
//             const currentQuality = item.quality || 1;
//             const newQuality = Math.max(1, Math.min(currentQuality + change, 10)); // Assuming max quality is 10
//             const basePrice = parseFloat(item.book.Price) || 0;
//             const newQuantity = newQuality;
//             const newTotalPrice = basePrice * newQuantity;
            
//             return {
//               ...item,
//               quality: newQuality,
//               quantity: newQuantity,
//               totalPrice: newTotalPrice
//             };
//           }
//           return item;
//         })
//       };

//       const response = await axios.put('http://localhost:1000/api/cart/update', updatedCart, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         setCart(updatedCart);
//       } else {
//         throw new Error('Failed to update cart in the database');
//       }
//     } catch (error) {
//       console.error('Error updating cart:', error);
//       setError('Failed to update cart. Please try again.');
//     }
//   };

//   const handleRemoveFromCart = async (bookId) => {
//     try {
//       const response = await axios.delete(`http://localhost:1000/api/cart/remove/${bookId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         fetchCartDetails(); // Refresh cart after removal
//       } else {
//         throw new Error('Failed to remove item from cart');
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//       setError('Failed to remove item from cart. Please try again.');
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
//   }

//   if (!cart || cart.books.length === 0) {
//     return (
//       <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeImage})` }}>
//         <Navbar />
//         <div className="flex items-center justify-center h-screen">
//           <div className="bg-white bg-opacity-75 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
//             <p className="text-center text-xl font-semibold">No items in the cart.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeImage})` }}>
//       <Navbar />
//       <div className="flex items-center justify-center min-h-screen py-12">
//         <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-4xl">
//           {cart.books.map((item) => (
//             <div key={item.book._id} className="flex flex-col md:flex-row items-center border-b border-gray-300 py-6">
//               <div className="md:w-1/3 mb-4 md:mb-0">
//                 <img
//                   src={item.book.bookimage}
//                   alt={item.book.title}
//                   className="h-52 w-full object-cover rounded-lg"
//                 />
//               </div>
//               <div className="md:w-2/3 md:pl-6 flex flex-col">
//                 <h2 className="text-2xl font-bold text-gray-800">{item.book.title}</h2>
//                 <p className="text-xl font-bold text-gray-700 mt-2">
//                   Rs. {(() => {
//                     const price = item.totalPrice || item.book.Price;
//                     if (typeof price === 'number') {
//                       return price.toFixed(2);
//                     } else {
//                       const parsedPrice = parseFloat(price);
//                       return isNaN(parsedPrice) ? 'N/A' : parsedPrice.toFixed(2);
//                     }
//                   })()}
//                 </p>
//                 <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity || 1}</p>
//                 <div className="flex items-center mt-4">
//                   <span className="mr-2">Quality:</span>
//                   <button
//                     onClick={() => handleQualityChange(item.book._id, -1)}
//                     className="bg-gray-200 text-gray-800 px-2 py-1 rounded-l"
//                   >
//                     -
//                   </button>
//                   <span className="bg-gray-100 px-4 py-1">{item.quality || 1}</span>
//                   <button
//                     onClick={() => handleQualityChange(item.book._id, 1)}
//                     className="bg-gray-200 text-gray-800 px-2 py-1 rounded-r"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <div className="flex mt-6">
//                   <button
//                     onClick={() => handleCheckout(item.book._id)}
//                     className="bg-red-700 text-white text-lg font-semibold px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300 mr-4"
//                   >
//                     Proceed to Checkout
//                   </button>
//                   <button
//                     onClick={() => handleRemoveFromCart(item.book._id)}
//                     className="bg-gray-300 text-gray-700 text-lg font-semibold px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
//                   >
//                     Remove from Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartComponent;

// kkk

import React, { useEffect, useState } from 'react';
import HomeImage from '../Home/BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const CartComponent = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ books: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCartDetails();
  }, [token]);

  const fetchCartDetails = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/cart/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data.cart || { books: [] });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart details:', error);
      setError('Failed to load cart details.');
      setLoading(false);
    }
  };

  const handleCheckout = (bookId) => {
    navigate(`/checkout/${bookId}`);
  };

  const handleQuantityChange = async (bookId, change) => {
    try {
      const updatedCart = {
        ...cart,
        books: cart.books.map(item => {
          if (item.book._id === bookId) {
            const currentQuantity = item.quantity || 1;
            const newQuantity = Math.max(1, currentQuantity + change);
            const basePrice = parseFloat(item.book.Price) || 0;
            const newTotalPrice = basePrice * newQuantity;
            
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: newTotalPrice
            };
          }
          return item;
        })
      };

      const response = await axios.put('http://localhost:1000/api/cart/update', updatedCart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCart(updatedCart);
      } else {
        throw new Error('Failed to update cart in the database');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      setError('Failed to update cart. Please try again.');
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/cart/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        fetchCartDetails(); // Refresh cart after removal
      } else {
        throw new Error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Failed to remove item from cart. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  }

  if (!cart || cart.books.length === 0) {
    return (
      <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeImage})` }}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white bg-opacity-75 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
            <p className="text-center text-xl font-semibold">No items in the cart.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeImage})` }}>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen py-12">
        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-4xl">
          {cart.books.map((item) => (
            <div key={item.book._id} className="flex flex-col md:flex-row items-center border-b border-gray-300 py-6 relative">
              <button
                onClick={() => handleRemoveFromCart(item.book._id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
              
              <div className="md:w-1/3 mb-4 md:mb-0">
                <img
                  src={item.book.bookimage}
                  alt={item.book.title}
                  className="h-52 w-full object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3 md:pl-6 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800">{item.book.title}</h2>
                <p className="text-xl font-bold text-gray-700 mt-2">
                  Rs. {(() => {
                    const price = item.totalPrice || item.book.Price;
                    if (typeof price === 'number') {
                      return price.toFixed(2);
                    } else {
                      const parsedPrice = parseFloat(price);
                      return isNaN(parsedPrice) ? 'N/A' : parsedPrice.toFixed(2);
                    }
                  })()}
                </p>
                <div className="flex items-center mt-4">
                  <span className="mr-2">Quantity:</span>
                  <button
                    onClick={() => handleQuantityChange(item.book._id, -1)}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-4 py-1">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.book._id, 1)}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>
                <div className="flex mt-6">
                  <button
                    onClick={() => handleCheckout(item.book._id)}
                    className="bg-red-700 text-white text-lg font-semibold px-6 py-2 rounded-lg hover:bg-red-800 transition duration-300 mr-4"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartComponent;