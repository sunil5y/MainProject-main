
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import HomeImage from '../Home/BackImage.jpg';
// import Navbar from '../Navbar/NavbarComponent';

// const AdminOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [expandedOrderId, setExpandedOrderId] = useState(null); // For expanding order details
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Fetch orders on component load
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/orders/', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setOrders(response.data); // Set orders from the response
//       } catch (error) {
//         setError('Failed to fetch orders');
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
//           <h1 className="text-2xl font-bold mb-4">Order List</h1>
//           {error && <p className="text-red-500">{error}</p>}
//           {successMessage && <p className="text-green-600">{successMessage}</p>}
//           <table className="min-w-full bg-white rounded-2xl">
//             <thead className="rounded-2xl">
//               <tr className="bg-red-500">
//                 <th className="py-2 px-4 border-b">User</th>
//                 <th className="py-2 px-4 border-b">Book Title</th>
//                 <th className="py-2 px-4 border-b">Quantity</th>
//                 <th className="py-2 px-4 border-b">Total Price</th>
//                 <th className="py-2 px-4 border-b">Status</th>
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
//                       {order.cart?.map(item => item.book.title).join(', ') || 'Unknown title'}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       {order.cart?.reduce((acc, item) => acc + item.quantity, 0) || 1}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       Rs. {order.cart?.reduce((acc, item) => acc + (item.quantity * item.book.price), 0) || 'N/A'}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       <select
//                         value={order.status}
//                         onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                         className="border rounded px-2 py-1"
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                       </select>
//                     </td>
//                   </tr>
//                   {/* Expandable Details */}
//                   {expandedOrderId === order._id && (
//                     <tr>
//                       <td colSpan="5" className="px-4 border-b bg-gray-100">
//                         <div className="p-4">
//                           <p>
//                             <strong>User Email:</strong> {order.user?.email || 'N/A'}
//                           </p>
//                           <p>
//                             <strong>Address:</strong> {order.user?.address || 'N/A'}
//                           </p>
//                           <p>
//                             <strong>Phone Number:</strong> {order.user?.number || 'N/A'}
//                           </p>
//                           <p>
//                             <strong>Order Status:</strong> {order.status}
//                           </p>
//                           <p>
//                             <strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}
//                           </p>
//                           <p>
//                             <strong>Books:</strong> {order.cart?.map(item => `${item.book.title} x${item.quantity}`).join(', ') || 'No items'}
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

// export default AdminOrder;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeImage from '../Home/BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/orders/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:1000/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.status } : order
        )
      );
      setSuccessMessage('Order status updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setError('Failed to update order status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeImage})` }}>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="bg-white bg-opacity-90 shadow-xl rounded-lg overflow-hidden">
          <h1 className="text-3xl font-bold mb-6 p-6 text-center text-gray-800 border-b">Order Management</h1>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-6" role="alert">
              <p>{error}</p>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mx-6" role="alert">
              <p>{successMessage}</p>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">{order.user?.name || 'Unknown User'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.book?.title || 'Unknown title'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">Rs. {order.book?.Price || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleOrderClick(order._id)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                        >
                          {expandedOrderId === order._id ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>
                    </tr>
                    {expandedOrderId === order._id && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4">
                          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                            <h4 className="text-lg font-semibold mb-2">Order Details</h4>
                            <p><strong>User Email:</strong> {order.user?.email || 'N/A'}</p>
                            <p><strong>Address:</strong> {order.user?.address || 'N/A'}</p>
                            <p><strong>Phone Number:</strong> {order.user?.number || 'N/A'}</p>
                            <p><strong>Order Status:</strong> {order.status}</p>
                            <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;