import React, { useState } from 'react';
import BackImage from '../Home/BackImage.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const Registration = () => {
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setFormError('');
      setSuccess(true);
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err.response ? err.response.data : err.message);
      setFormError('Error signing up');
      setSuccess(false);
    }
  };

  const closePopup = () => {
    setSuccess(false);
  };

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center px-4 py-8" style={{ backgroundImage: `url(${BackImage})` }}>
      <div className='w-full max-w-md'>
        <div className='bg-slate-800 bg-opacity-70 shadow-lg rounded-3xl p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-4 text-center text-white'>Sign Up</h1>
          <form onSubmit={handleSignupSubmit}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm font-medium text-white'>Name</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='text' id='name' name='name' value={signupForm.name} onChange={handleSignupFormChange} required />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='email' id='email' name='email' value={signupForm.email} onChange={handleSignupFormChange} required />
            </div>
            <div className='mb-6 relative'>
              <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
              <input 
                className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none pr-10' 
                type={showPassword ? 'text' : 'password'} 
                id='password' 
                name='password' 
                value={signupForm.password} 
                onChange={handleSignupFormChange} 
                required 
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-white" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
            {formError && <p className='text-red-500 text-sm mb-4'>{formError}</p>}
            <div className='text-center'>
              <button type='submit' className='bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-lg w-full sm:w-auto sm:min-w-[120px]'>Sign Up</button>
            </div>
          </form>
          <div className="mt-4 text-center flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 p-2">
            <p className="text-white">Already a user?</p>
            <a href="/login" className="text-green-500 hover:underline hover:text-green-700 transition duration-300 ease-in-out">Sign In</a>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Registration Successful</h3>
            <p>Your account has been created successfully!</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-300 w-full"
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



// import React, { useState } from 'react';
// import BackImage from '../Home/BackImage.jpg';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [signupForm, setSignupForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     address: '',
//     phoneNumber: '',
//     dob: '',
//     city: '',
//     country: ''
//   });
//   const [formError, setFormError] = useState({});
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     let errors = {};

//     // Name validation
//     if (!signupForm.name.trim()) {
//       errors.name = 'Name is required';
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!signupForm.email) {
//       errors.email = 'Email is required';
//     } else if (!emailRegex.test(signupForm.email)) {
//       errors.email = 'Email is not valid';
//     }

//     // Password validation
//     if (!signupForm.password) {
//       errors.password = 'Password is required';
//     } else if (signupForm.password.length < 8) {
//       errors.password = 'Password must be at least 8 characters';
//     }

//     // Address validation
//     if (!signupForm.address.trim()) {
//       errors.address = 'Address is required';
//     }

//     // Phone number validation
//     const phoneRegex = /^[0-9]{10}$/; // Assumes a 10-digit phone number
//     if (!signupForm.phoneNumber) {
//       errors.phoneNumber = 'Phone number is required';
//     } else if (!phoneRegex.test(signupForm.phoneNumber)) {
//       errors.phoneNumber = 'Phone number must be 10 digits';
//     }

//     // Date of Birth validation
//     if (!signupForm.dob) {
//       errors.dob = 'Date of Birth is required';
//     }

//     // City validation
//     if (!signupForm.city.trim()) {
//       errors.city = 'City is required';
//     }

//     // Country validation
//     if (!signupForm.country.trim()) {
//       errors.country = 'Country is required';
//     }

//     setFormError(errors);
//     return Object.keys(errors).length === 0; // Return true if no errors
//   };

//   const handleSignupFormChange = (e) => {
//     setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:1000/api/auth/register', signupForm);
//       console.log('Signing up...', res.data);
//       setFormError({}); // Clear any previous error
//       setSuccess(true); // Show success message
//       navigate('/login');
//     } catch (err) {
//       console.error('Signup error:', err.response ? err.response.data : err.message);
//       setFormError({ submit: 'Error signing up' });
//       setSuccess(false); // Hide success message if there's an error
//     }
//   };

//   const closePopup = () => {
//     setSuccess(false); // Hide success message when popup is closed
//   };

//   return (
//     <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center" style={{ backgroundImage: `url(${BackImage})` }}>
//       <div className='flex justify-center items-center h-full w-full'>
//         <div className='w-full md:w-2/3 lg:w-1/2 bg-slate-800 bg-opacity-70 shadow-lg rounded-3xl p-8 mx-4 md:mx-0 mt-4 md:mt-0'>
//           <h1 className='text-3xl font-bold mb-4 text-center text-white'>Sign Up</h1>
//           <form onSubmit={handleSignupSubmit}>
//             <div className="flex flex-wrap -mx-3">
//               {/* Left Column */}
//               <div className="w-full md:w-1/2 px-3 mb-6">
//                 <div className='mb-4'>
//                   <label htmlFor='name' className='block text-sm font-medium text-white'>Name</label>
//                   <input
//                     className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none'
//                     type='text'
//                     id='name'
//                     name='name'
//                     value={signupForm.name}
//                     onChange={handleSignupFormChange}
//                     required
//                   />
//                   {formError.name && <p className='text-red-500 text-sm mt-2'>{formError.name}</p>}
//                 </div>
//                 <div className='mb-4'>
//                   <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
//                   <input
//                     className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none'
//                     type='email'
//                     id='email'
//                     name='email'
//                     value={signupForm.email}
//                     onChange={handleSignupFormChange}
//                     required
//                   />
//                   {formError.email && <p className='text-red-500 text-sm mt-2'>{formError.email}</p>}
//                 </div>
//                 <div className='mb-4'>
//                   <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
//                   <input
//                     className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none'
//                     type='password'
//                     id='password'
//                     name='password'
//                     value={signupForm.password}
//                     onChange={handleSignupFormChange}
//                     required
//                   />
//                   {formError.password && <p className='text-red-500 text-sm mt-2'>{formError.password}</p>}
//                 </div>
//                 <div className='mb-4'>
//                   <label htmlFor='address' className='block text-sm font-medium text-white'>Address</label>
//                   <input
//                     className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none'
//                     type='text'
//                     id='address'
//                     name='address'
//                     value={signupForm.address}
//                     onChange={handleSignupFormChange}
//                     required
//                   />
//                   {formError.address && <p className='text-red-500 text-sm mt-2'>{formError.address}</p>}
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="w-full md:w-1/2 px-3 mb-6">
//                 <div className='mb-4'>
//                   <label htmlFor='phoneNumber' className='block text-sm font-medium text-white'>Phone Number</label>
//                   <input
//                     className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none'
//                     type='text'
//                     id='phoneNumber'
//                     name='phoneNumber'
//                     value={signupForm.phoneNumber}
//                     onChange={handleSignupFormChange}
//                     required
//                   />
//                   {formError.phoneNumber && <p className='text-red-500 text-sm mt-2'>{formError.phoneNumber}</p>}
//                 </div>
//                 <div className='mb-4'>
//                   <label htmlFor='dob' className='block text-sm font-medium text-white'>Date of Birth</label>
//                   <input
//                     className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none'
//                     type='date'
//                     id='dob'
//                     name='dob'
//                     value={signupForm.dob}
//                     onChange={handleSignupFormChange}
//                     required
//                   />
//                   {formError.dob && <p className='text-red-500 text-sm mt-2'>{formError.dob}</p>}
//                 </div>
//                 <div className='mb-4'>
//                   <label htmlFor='city' className='block text-sm font-medium text-white'>City</label>
//                   <input
//                     className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none'
//                     type='text'
//                     id='city'
//                     name='city'
//                     value={signupForm.city}
//                     onChange={handleSignupFormChange}
//                     required
//                   />
//                   {formError.city && <p className='text-red-500 text-sm mt-2'>{formError.city}</p>}
//                 </div>
//                 <div className='mb-6'>
//                   <label htmlFor='country' className='block text-sm font-medium text-white'>Country</label>
//                   <input
//                     className='flex mt-1 p-2 border-0 border-b-2 w-full text-white border-gray-300 bg-transparent focus:ring-0 outline-none'
//                     type='text'
//                     id='country'
//                     name='country'
//                     value={signupForm.country}
//                     onChange={handleSignupFormChange}
//                     required
//                   />
//                   {formError.country && <p className='text-red-500 text-sm mt-2'>{formError.country}</p>}
//                 </div>
//               </div>
//             </div>
//             {formError.submit && <p className='text-red-500 text-sm mb-4 text-center'>{formError.submit}</p>}
//             <div className="flex justify-center">
//               <button
//                 className='w-80 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 focus:ring focus:ring-blue-300 transition duration-200'
//                 type='submit'
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       {success && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
//             <p className="mb-4">You have successfully registered. You can now log in.</p>
//             <button
//               className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 transition duration-200"
//               onClick={closePopup}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Registration;
