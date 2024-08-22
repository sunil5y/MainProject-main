import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeImage from '../Home/BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AdminOrder = () => {
  const [payments, setPayments] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
  
        // Retrieve the token from localStorage (or wherever it's stored)
        const token = localStorage.getItem('token'); 
  
        // Check if token exists
        if (!token) {
          setError('No token found, authorization denied.');
          return;
        }
  
        // Configure the headers with the Authorization token
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
  
        const response = await axios.get('http://localhost:1000/api/checkout', config);
        console.log('Payments response:', response.data);
        setPayments(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user list:', error.response ? error.response.data : error.message);
        setError('Failed to fetch payments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPayments();
  }, []);

  const handleUserClick = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${HomeImage})` }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 px-4">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-red-600">User Payments</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-red-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">User Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Book Title</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <React.Fragment key={payment._id}>
                    <tr className="border-b hover:bg-gray-100 transition-colors duration-200">
                      <td className="py-3 px-4">{payment.user.name}</td>
                      <td className="py-3 px-4">{payment.user.email}</td>
                      <td className="py-3 px-4">
                        {payment.book ? payment.book.title : 'No title available'}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleUserClick(payment._id)}
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          {expandedUserId === payment._id ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>
                    </tr>
                    <tr className={`bg-gray-50 ${expandedUserId === payment._id ? '' : 'hidden'}`}>
                      <td colSpan="4" className="py-4 px-4">
                        <div className="grid grid-cols-2 gap-4">
                          <p><strong>Card Holder:</strong> {payment.name}</p>
                          <p><strong>Card Number:</strong> {payment.number}</p>
                          <p><strong>Expiration:</strong> {payment.expiration}</p>
                          <p><strong>CVV:</strong> {payment.cvv}</p>
                        </div>
                      </td>
                    </tr>
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
