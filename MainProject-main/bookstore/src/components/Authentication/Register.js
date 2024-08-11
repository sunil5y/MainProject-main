import React, { useState } from 'react';
import BackImage from '../Home/BackImage.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignupFormChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      setFormError('Please fill in all fields.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:1000/api/auth/register', signupForm);
      console.log('Signing up...', res.data);
      setFormError(''); // Clear any previous error
      setSuccess(true); // Show success message
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err.response ? err.response.data : err.message);
      setFormError('Error signing up');
      setSuccess(false); // Hide success message if there's an error
    }
  };

  const closePopup = () => {
    setSuccess(false); // Hide success message when popup is closed
  };

  
  const navigate = useNavigate();

  return (
    <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center" style={{ backgroundImage: `url(${BackImage})` }}>
      <div className='flex justify-center items-center h-full w-full space-x-10'>
        <div className='w-full md:w-1/2 lg:w-1/3 bg-slate-800 bg-opacity-70 shadow-lg rounded-3xl p-8 mx-4 md:mx-0 mt-4 md:mt-0'>
          <h1 className='text-3xl font-bold mb-4 text-center text-white'>Sign Up</h1>
          <form onSubmit={handleSignupSubmit}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm font-medium text-white'>Name</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='text' id='name' name='name' value={signupForm.name} onChange={handleSignupFormChange} required />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='email' id='email' name='email' value={signupForm.email} onChange={handleSignupFormChange} required />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='password' id='password' name='password' value={signupForm.password} onChange={handleSignupFormChange} required />
            </div>
            {formError && <p className='text-red-500 text-sm mb-4'>{formError}</p>}
            <div className='text-center'>
              <button type='submit' className='bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-lg w-5/12'>Sign Up</button>
            </div>
          </form>
          <div className="mt-4 text-center flex justify-center items-center space-x-2 p-2">
            <p className="text-white">Already a user?</p>
            <a href="/login" className="text-green-500 hover:underline hover:text-green-700 transition duration-300 ease-in-out">Sign In</a>
          </div>

        </div>
      </div>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Registration Successful</h3>
            <p>Your account has been created successfully!</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
