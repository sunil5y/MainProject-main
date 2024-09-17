// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import HomeImage from '../Home/BackImage.jpg';
// import Navbar from '../Navbar/NavbarComponent';

// const AdminInquiry = () => {
//   const [orders, setOrders] = useState([]);
//   const [expandedOrderId, setExpandedOrderId] = useState(null); // For expanding order details
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fetch orders on component load
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/contact/get', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setOrders(response.data); // Set orders from the response
//       } catch (error) {
//         setError('Failed to fetch orde');
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Handle status change
//   const handleStatusChange = async (orderId, status) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:1000/api/orders/${orderId}/status`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );
//       setOrders(
//         orders.map((order) =>
//           order._id === orderId ? { ...order, status: response.data.status } : order
//         )
//       );
//       setSuccessMessage('Order status updated successfully');
//     } catch (error) {
//       console.error(error);
//       setError('Failed to update order status');
//     }
//   };

//   const handleOrderClick = (orderId) => {
//     setExpandedOrderId(expandedOrderId === orderId ? null : orderId); // Toggle expanded state
//   };

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
//       <div className="flex flex-col items-center justify-center h-full relative">
//         <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg mt-20 h-4/5 w-4/5 overflow-auto text-center">
//           <h1 className="text-2xl font-bold mb-4">Inquiry List</h1>
//           {error && <p className="text-red-500">{error}</p>}
//           {successMessage && <p className="text-green-600">{successMessage}</p>}
//           <table className="min-w-full bg-white rounded-2xl">
//             <thead className="rounded-2xl">
//               <tr className="bg-red-500">
//                 <th className="py-2 px-4 border-b">User</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <React.Fragment key={order._id}>
//                   <tr
//                     onClick={() => handleOrderClick(order._id)}
//                     className="cursor-pointer hover:bg-gray-200"
//                   >
//                     <td className="py-2 px-4 border-b">
//                       {order.user?.name || 'Unknown User'}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       {order.user?.email || 'Unknown Bike'}
//                     </td>
//                   </tr>
//                   {/* Expandable Details */}
//                   {expandedOrderId === order._id && (
//                     <tr>
//                       <td colSpan="4" className="px-4 border-b bg-gray-100">
//                         <div className="p-4">
//                           <p>
//                             <strong>Message:</strong> {order.message || 'N/A'}
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminInquiry;