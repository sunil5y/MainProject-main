import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeImage from '../Home/BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import { MdDelete, MdExpandMore, MdExpandLess } from 'react-icons/md';

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/orders/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleRemoveOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:1000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders(orders.filter(order => order._id !== orderId));
      setSuccessMessage('Order removed successfully');
    } catch (error) {
      setError('Failed to remove order');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${HomeImage})` }}
    >
      <div className="min-h-screen bg-black bg-opacity-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">My Orders</h1>
          {error && <p className="text-red-500 text-center mb-4 bg-white bg-opacity-75 p-2 rounded">{error}</p>}
          {successMessage && <p className="text-green-600 text-center mb-4 bg-white bg-opacity-75 p-2 rounded">{successMessage}</p>}
          
          {orders.length === 0 ? (
            <p className="text-center text-white bg-black bg-opacity-50 p-4 rounded">You have no orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden hover:bg-opacity-100 transition-all duration-300">
                  <div 
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => handleOrderClick(order._id)}
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{order.book?.title || 'Unknown Book'}</h2>
                      <p className="text-sm text-gray-600">Status: {order.status || 'N/A'}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-800 mr-4">
                        Rs. {order.cart?.totalPrice || 'N/A'}
                      </span>
                      {expandedOrderId === order._id ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                    </div>
                  </div>
                  
                  {expandedOrderId === order._id && (
                    <div className="p-4 bg-gray-100 border-t border-gray-200">
                      <p className="text-sm text-gray-600"><strong>User Email:</strong> {order.user?.email || 'N/A'}</p>
                      <p className="text-sm text-gray-600"><strong>Address:</strong> {order.profile?.address || 'N/A'}</p>
                      <p className="text-sm text-gray-600"><strong>Phone Number:</strong> {order.profile?.phoneNumber || 'N/A'}</p>
                      <p className="text-sm text-gray-600"><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveOrder(order._id);
                        }}
                        className="mt-2 flex items-center text-red-600 hover:text-red-800"
                      >
                        <MdDelete className="mr-1" /> Remove Order
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrder;