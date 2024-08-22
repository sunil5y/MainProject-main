// import './App.css';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar/NavbarComponent';
// import HomeComponent from './components/Home/HomeComponent';
// import ContactComponent from './components/Contact/ContactComponent';
// // import AuthenticationComponent from './components/Authentication/AuthenticationComponent';
// import ModelsComponent from './components/Shop/ModelsComponent';
// import ModelsDetail from './components/Shop/ModelsDetail';
// import CartComponent from './components/Cart/CartComponent';
// import ProfileComponent from './components/Profile/ProfileComponent';
// import CheckoutComponent from './components/Checkout/CheckoutComponent';
// import Login from './components/Authentication/login';
// import Registration from './components/Authentication/Register';
// import AdminDashboard from './components/Admin/AdminDashboard';
// import AdminUser from './components/Admin/AdminUser';
// import AdminBook from './components/Admin/AdminBook';

// function App() {
//   return (
//     <>
//     <Router>
//       <Navbar />
//       <Routes>
//       <Route path="/" element = {<HomeComponent />}/>
//       <Route path="/books" element = {<ModelsComponent/>}/>
//       <Route path="/cart/:id" element={<CartComponent />}/>
//       <Route path='/contact' element ={<ContactComponent />}/>
//       <Route path='/profile' element ={<ProfileComponent />}/>
//       <Route path='/register' element ={<Registration/>}/>
//       <Route path='/login' element ={<Login/>}/>
//       <Route path="/modelsDetail/:id" element={<ModelsDetail />} />
//       <Route path='/checkout/:id' element ={<CheckoutComponent />}/>
//       <Route path="/admin" element={<AdminDashboard />}/>
//       <Route path='/adminbook' element ={<AdminBook />}/>
//       <Route path='/adminuser' element={<AdminUser/>}/>
//       </Routes>
//     </Router>
//     </>

//   );
// }

// export default App;


// // const express=require('express');
// // require('dotenv').config();
// // const port = process.env.port;
// // const app=express();
// // app.use(express.json());

// // const connectDB = require("./src/Config/db")
// // // const userRoute = require('./src/Routes/userRoute')
// // const bikeRoute = require('./src/Routes/bikeRoute')
// // connectDB();

// // // app.use('/user',userRoute)
// // app.use('/bike',bikeRoute)

// // app.listen(port,()=>{
// //     console.log(`Server is running on ${port}`);
// // })

// // export default App;

// // import React from 'react'
// // import ParentComponent from './components/PropDrilling/ParentComponent';

// // const App = () => {
// //   const [ message, setMessage] = useState("Hello from App!");
// //   return <ParentComponent message={message} />
// // };

// // export default App

// // import React from 'react'

// // const App = () => {
// //   return (
// //     <>
// //       <NavbarComponent />
// //     </>
// //   )
// // }

// // export default App



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const GamingLaptops = () => {
// //   const [products, setProducts] = useState([]);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Fetch products from the API
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:4000/api/products');
// //         setProducts(response.data);
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //         setError('Failed to fetch products. Please try again later.');
// //       }
// //     };

// //     fetchProducts();
// //   }, []); // Empty dependency array means this effect runs once on mount

// //   if (error) {
// //     return (
// //       <div className="container mx-auto px-4 mt-24">
// //         <p className="text-center text-red-600">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto px-4 mt-24">
// //       <h1 className="text-3xl font-bold text-center my-8">Gaming Laptops</h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 ">
// //         {products.map((product) => (
// //           <div
// //             key={product._id} // Use a unique identifier if available
// //             className="border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-110"
// //           >
// //             <img
// //               src={product.image}
// //               alt={product.name}
// //               className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
// //             />
// //             <div className="p-4 flex flex-col flex-grow">
// //               <h2 className="text-lg font-bold mb-2">{product.name}</h2>
// //               <p className="text-sm text-gray-600 mb-2">{product.productCount}</p>
// //               <p className="text-xs text-gray-500 mb-2">
// //                 {Array.isArray(product.specs) ? product.specs.join(' • ') : 'No specs available'}
// //               </p>
// //               <div className="mt-auto">
// //                 <p className="text-sm line-through text-gray-400">Starting at Rs.{product.originalPrice}</p>
// //                 <p className="text-xl font-bold mb-4">Rs.{product.currentPrice}</p>
// //                 <button className="w-full bg-white text-black border border-black py-2 px-4 rounded hover:bg-gray-900 hover:text-white transition-colors">
// //                   VIEW DETAILS
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default GamingLaptops;

import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/NavbarComponent';
import HomeComponent from './components/Home/HomeComponent';
import ContactComponent from './components/Contact/ContactComponent';
// import AuthenticationComponent from './components/Authentication/AuthenticationComponent';
import ModelsComponent from './components/Shop/ModelsComponent';
import ModelsDetail from './components/Shop/ModelsDetail';
import CartComponent from './components/Cart/CartComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import CheckoutComponent from './components/Checkout/CheckoutComponent';
import Login from './components/Authentication/login';
import Registration from './components/Authentication/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminUser from './components/Admin/AdminUser';
import AdminBook from './components/Admin/AdminBook';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import AdminOrder from './components/Admin/AdminOrder';


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element = {<HomeComponent />}/>
      <Route path="/books" element = {<ModelsComponent/>}/>
      <Route path="/cart" element={<ProtectedRoute role="user"><CartComponent /></ProtectedRoute>}/>
      <Route path='/contact' element ={<ContactComponent />}/>
      <Route path='/profile' element ={<ProfileComponent />}/>
      <Route path='/register' element ={<Registration/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path="/modelsDetail/:id" element={<ModelsDetail />} />
      <Route path='/checkout/:id' element ={<CheckoutComponent />}/>


      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path='/adminbook' element ={<ProtectedRoute role="admin"><AdminBook /></ProtectedRoute>}/>
      <Route path="/adminuser" element={<ProtectedRoute role="admin"><AdminUser /></ProtectedRoute>} />
      <Route path="/adminorder" element={<ProtectedRoute role="admin"><AdminOrder /></ProtectedRoute>} />

      </Routes>
    </Router>
    </>

  );
}

export default App;
