// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BackImage from '../Home/BackImage.jpg';
// import axios from 'axios';

// const Login = () => {
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [formError, setFormError] = useState('');
//   const navigate = useNavigate();

//   const handleLoginFormChange = (e) => {
//     setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     if (!loginForm.email || !loginForm.password) {
//       setFormError('Please fill in all fields.');
//       return;
//     }
//     try {
//       const res = await axios.post('http://localhost:1000/api/auth/login', loginForm);
//       console.log('Logging in...', res.data);
//       setFormError(''); // Clear any previous error
//       navigate('/'); // Redirect to the homepage on successful login
//     } catch (err) {
//       console.error('Login error:', err.response ? err.response.data : err.message);
//       setFormError(err.response?.data?.msg || 'Invalid credentials');
//     }
//   };

//   return (
//     <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center" style={{ backgroundImage: `url(${BackImage})` }}>
//       <div className='flex justify-center items-center h-full w-full space-x-10'>
//         <div className='w-full md:w-1/2 lg:w-1/3 bg-slate-800  bg-opacity-55 shadow-lg rounded-3xl p-8 mx-4 md:mx-0'>
//           <h1 className='text-3xl font-bold mb-4 text-center text-white'>Login</h1>
//           <form onSubmit={handleLoginSubmit}>
//             <div className='mb-4'>
//               <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
//               <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='email' id='email' name='email' value={loginForm.email} onChange={handleLoginFormChange} required />
//             </div>
//             <div className='mb-6'>
//               <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
//               <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='password' id='password' name='password' value={loginForm.password} onChange={handleLoginFormChange} required />
//             </div>
//             {formError && <p className='text-red-500 text-sm mb-4'>{formError}</p>}
//             <div className='text-center'>
//               <button type='submit' className='bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg w-5/12'>Login</button>
//             </div>
//           </form>
//           <div className="mt-4 text-center flex justify-center items-center space-x-2 p-2">
//             <p className="text-white">Dont have an Account?</p>
//             <a href="/register" className="text-green-500 hover:underline hover:text-green-700 transition duration-300 ease-in-out">Sign Up</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BackImage from '../Home/BackImage.jpg';
// import axios from 'axios';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { login } from "../../features/auth/authSlice";

// const Login = () => {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const [formError, setErrors] = useState({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     const errors = {};
//     if (!loginData.email) errors.email = "Email is required";
//     if (!loginData.password) errors.password = "Password is required";
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const validationErrors = validate();
//   setErrors(validationErrors);

//   if (Object.keys(validationErrors).length === 0) {
//     try {
//       const response = await axios.post(
//         "http://localhost:1000/api/auth/login",
//         loginData
//       );

//       if (response && response.data) {
//         const { token, userDetails } = response.data;

//         if (token && userDetails && userDetails.role) {
//           localStorage.setItem("token", token);
//           dispatch(login({ token, role: userDetails.role }));
//           toast.success("Login successful");

//           // Navigate based on role
//           if (userDetails.role === 'admin') {
//             navigate('/admin');
//           } else {
//             navigate('/'); // Navigate to user homepage or any other user-specific route
//           }
//         } else {
//           toast.error("Invalid response from server. Please try again.");
//         }
//       } else {
//         toast.error("Unexpected server response");
//       }
//     } catch (error) {
//       console.error("Error:", error);

//       if (error.response && error.response.data && error.response.data.msg) {
//         toast.error(error.response.data.msg);
//       } else if (error.response && error.response.data) {
//         // Handle other possible error structures
//         toast.error("Unexpected error structure.");
//         console.error("Unexpected error structure:", error.response.data);
//       } else {
//         toast.error("An unexpected error occurred. Please try again.");
//       }
//     }
//   }
// };


//   return (
//     <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center" style={{ backgroundImage: `url(${BackImage})` }}>
//       <div className='flex justify-center items-center h-full w-full space-x-10'>
//         <div className='w-full md:w-1/2 lg:w-1/3 bg-red-700 bg-opacity-55 shadow-lg rounded-3xl p-8 mx-4 md:mx-0'>
//           <h1 className='text-3xl font-bold mb-4 text-center text-white'>Login</h1>
//           <form onSubmit={handleSubmit}>
//             <ToastContainer />
//             <div className='mb-4'>
//               <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
//               <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='email' id='email' name='email' value={loginData.email} onChange={handleChange} required />
//               {formError.email && <p className='text-red-500 text-sm'>{formError.email}</p>}
//             </div>
//             <div className='mb-6'>
//               <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
//               <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='password' id='password' name='password' value={loginData.password} onChange={handleChange} required />
//               {formError.password && <p className='text-red-500 text-sm'>{formError.password}</p>}
//             </div>
//             <div className='text-center'>
//               <button type='submit' className='bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg w-5/12'>Login</button>
//             </div>
//           </form>
//           <div className="mt-4 text-center flex justify-center items-center space-x-2 p-2">
//             <p className="text-white">Don't have an Account?</p>
//             <a href="/register" className="text-green-500 hover:underline hover:text-green-700 transition duration-300 ease-in-out">Sign Up</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackImage from '../Home/BackImage.jpg';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginFormChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!loginForm.email) errors.email = "Email is required";
    if (!loginForm.password) errors.password = "Password is required";
    return errors;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setFormError(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post('http://localhost:1000/api/auth/login', loginForm);
        const { token, userDetails } = res.data;
  
        if (token) {
          if (userDetails && userDetails.role) {
            localStorage.setItem("token", token);
            dispatch(login({ token, role: userDetails.role }));
            toast.success("Login successful");
  
            // Navigate based on role
            if (userDetails.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/');
            }
          } else {
            // Handle missing or incorrect userDetails
            toast.error("User details are missing or incomplete. Please try again.");
          }
        } else {
          toast.error("Token missing from server response. Please try again.");
        }
      } catch (err) {
        console.error('Login error:', err.response ? err.response.data : err.message);
        toast.error(err.response?.data?.msg || 'An error occurred during login.');
      }
    }
  };
  

  return (
    <div className="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center" style={{ backgroundImage: `url(${BackImage})` }}>
      <div className='flex justify-center items-center h-full w-full space-x-10'>
        <div className='w-full md:w-1/2 lg:w-1/3 bg-slate-800 bg-opacity-55 shadow-lg rounded-3xl p-8 mx-4 md:mx-0'>
          <h1 className='text-3xl font-bold mb-4 text-center text-white'>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <ToastContainer />
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='email' id='email' name='email' value={loginForm.email} onChange={handleLoginFormChange} required />
              {formError.email && <p className='text-red-500 text-sm'>{formError.email}</p>}
            </div>
            <div className='mb-6'>
              <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
              <input className='flex mt-1 p-2 border-0 border-b-2 w-96 text-white border-gray-300 bg-transparent focus:ring-0 outline-none' type='password' id='password' name='password' value={loginForm.password} onChange={handleLoginFormChange} required />
              {formError.password && <p className='text-red-500 text-sm'>{formError.password}</p>}
            </div>
            <div className='text-center'>
              <button type='submit' className='bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg w-5/12'>Login</button>
            </div>
          </form>
          <div className="mt-4 text-center flex justify-center items-center space-x-2 p-2">
            <p className="text-white">Don't have an Account?</p>
            <a href="/register" className="text-green-500 hover:underline hover:text-green-700 transition duration-300 ease-in-out">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

