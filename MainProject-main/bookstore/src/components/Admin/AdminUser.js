import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeImage from '../Home/BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';
import { motion } from 'framer-motion';

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/auth/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url(${HomeImage})` }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-90 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-4xl overflow-hidden"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-800">User List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <React.Fragment key={user._id}>
                    <motion.tr
                      onClick={() => handleUserClick(user._id)}
                      className="cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <td className="py-3 px-4 border-b">{user.name}</td>
                      <td className="py-3 px-4 border-b">{user.email}</td>
                      <td className="py-3 px-4 border-b">{user.role}</td>
                    </motion.tr>
                    <motion.tr
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: expandedUserId === user._id ? 1 : 0,
                        height: expandedUserId === user._id ? "auto" : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <td colSpan="3" className="border-b">
                        <div className="p-4 bg-gray-50">
                          <p><strong>Name:</strong> {user.name}</p>
                          <p><strong>Email:</strong> {user.email}</p>
                          <p><strong>Role:</strong> {user.role}</p>
                        </div>
                      </td>
                    </motion.tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUser;