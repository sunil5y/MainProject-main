import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackImage from '../Home/BackImage.jpg';
import axios from 'axios';

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleLoginFormChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setFormError('Please fill in all fields.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:1000/api/auth/login', loginForm);
      console.log('Logging in...', res.data);
      setFormError(''); // Clear any previous error
      navigate('/'); // Redirect to the homepage on successful login
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setFormError(err.response?.data?.msg || 'Invalid credentials');
    }
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center" style={{ backgroundImage: `url(${BackImage})` }}>
      <div className='flex justify-center items-center h-full w-full space-x-10'>
        <div className='w-full md:w-1/2 lg:w-1/3 bg-slate-800  bg-opacity-55 shadow-lg rounded-3xl p-8 mx-4 md:mx-0'>
          <h1 className='text-3xl font-bold mb-4 text-center text-white'>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='email' id='email' name='email' value={loginForm.email} onChange={handleLoginFormChange} required />
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='password' id='password' name='password' value={loginForm.password} onChange={handleLoginFormChange} required />
            </div>
            {formError && <p className='text-red-500 text-sm mb-4'>{formError}</p>}
            <div className='text-center'>
              <button type='submit' className='bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg w-5/12'>Login</button>
            </div>
          </form>
          <div className="mt-4 text-center flex justify-center items-center space-x-2 p-2">
            <p className="text-white">Dont have an Account?</p>
            <a href="/register" className="text-green-500 hover:underline hover:text-green-700 transition duration-300 ease-in-out">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
