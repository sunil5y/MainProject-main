// import React, { useState } from 'react';
// import ProfileImage from './ProfileImage.png';
// import Navbar from '../Navbar/NavbarComponent';
// import DefaultAvatar from './DefaultAvatar.png';
// import { FaCamera } from 'react-icons/fa';

// const ProfileComponent = () => {
//   const [profilePic, setProfilePic] = useState(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => setProfilePic(e.target.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${ProfileImage})` }}>
//       <div className="w-full">
//         <Navbar />
//       </div>
      
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-white text-center mb-8">Profile</h1>
        
//         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-xl p-8">
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="md:w-1/3">
//               <div className="mb-6 relative">
//                 <img
//                   src={profilePic||DefaultAvatar}
//                   alt="Profile"
//                   className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white"
//                 />
//                 <label className="absolute bottom-0 right-1/4 bg-red-700 rounded-full p-2 cursor-pointer hover:bg-red-600 transition duration-300">
//                   <FaCamera className="text-white text-xl" />
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />
//                 </label>
//               </div>
//             </div>
            
//             <div className="md:w-2/3">
//               <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[
//                   'Full Name', 'Address', 'Date of Birth', 'Phone Number',
//                   'Country', 'City', 'Zip Code', 'Email', 'Password'
//                 ].map((label) => (
//                   <div key={label} className="flex flex-col">
//                     <label className="mb-2 font-medium text-white">{label}</label>
//                     <input
//                       className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                       type={label === 'Password' ? 'password' : 'text'}
//                     />
//                   </div>
//                 ))}
//               </form>
              
//               <div className="mt-8 text-center">
//                 <button className="bg-red-700 hover:bg-red-600 text-white text-xl px-8 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
//                   Save Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileComponent;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileImage from './ProfileImage.png';
// import Navbar from '../Navbar/NavbarComponent';
// import DefaultAvatar from './DefaultAvatar.png';
// import { FaCamera } from 'react-icons/fa';

// const ProfileComponent = () => {
//   const [profilePic, setProfilePic] = useState(null);
//   const [profileData, setProfileData] = useState({
//     fullName: '',
//     address: '',
//     dateOfBirth: '',
//     phoneNumber: '',
//     country: '',
//     city: '',
//     zipCode: '',
//     email: '',
//     profilePic:''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:1000/api/profile', {
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       setProfileData(response.data);
//       if (response.data.profilePic) {
//         setProfilePic(response.data.profilePic);
//       }
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//       if (error.response && error.response.status === 401) {
//         alert('Session expired. Please log in again.');
//         window.location.href = '/login';
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => setProfilePic(e.target.result);
//       reader.readAsDataURL(file);

//       const formData = new FormData();
//       formData.append('profilePic', file);

//       try {
//         const token = localStorage.getItem('token'); // Retrieve JWT token from storage
//         await axios.post('http://localhost:1000/api/profile/upload-image', formData, {
//           headers: { 
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}` // Set the Authorization header
//           }
//         });
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         if (error.response && error.response.status === 401) {
//           alert('Session expired. Please log in again.');
//           // Redirect to login page
//           window.location.href = '/login';
//         }
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token'); // Retrieve JWT token from storage
//       await axios.put('http://localhost:1000/api/profile', profileData, {
//         headers: { Authorization: `Bearer ${token}` } // Set the Authorization header
//       });
//       alert('Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating profile:', error.response ? error.response.data : error.message);
//       alert('Failed to update profile: ' + (error.response ? error.response.data.message : error.message));
//       if (error.response && error.response.status === 401) {
//         alert('Session expired. Please log in again.');
//         // Redirect to login page
//         window.location.href = '/login';
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${ProfileImage})` }}>
//       <div className="w-full">
//         <Navbar />
//       </div>
      
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-white text-center mb-8">Profile</h1>
        
//         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-xl p-8">
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="md:w-1/3">
//               <div className="mb-6 relative">
//                 <img
//                   src={profilePic || DefaultAvatar}
//                   alt="Profile"
//                   className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white"
//                 />
//                 <label className="absolute bottom-0 right-1/4 bg-red-700 rounded-full p-2 cursor-pointer hover:bg-red-600 transition duration-300">
//                   <FaCamera className="text-white text-xl" />
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     src={profileData.profilePic}
//                     onChange={handleImageUpload}
//                   />
//                 </label>
//               </div>
//             </div>
            
//             <div className="md:w-2/3">
//               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex flex-col">
//                   <label className="mb-2 font-medium text-white">Full Name</label>
//                   <input
//                     className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                     type="text"
//                     name="fullName"
//                     value={profileData.fullName}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="mb-2 font-medium text-white">Address</label>
//                   <input
//                     className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                     type="text"
//                     name="address"
//                     value={profileData.address}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="mb-2 font-medium text-white">Date of Birth</label>
//                   <input
//                     className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                     type="date"
//                     name="dateOfBirth"
//                     value={profileData.dateOfBirth}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="mb-2 font-medium text-white">Phone Number</label>
//                   <input
//                     className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                     type="text"
//                     name="phoneNumber"
//                     value={profileData.phoneNumber}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="mb-2 font-medium text-white">Country</label>
//                   <input
//                     className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                     type="text"
//                     name="country"
//                     value={profileData.country}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="mb-2 font-medium text-white">City</label>
//                   <input
//                     className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                     type="text"
//                     name="city"
//                     value={profileData.city}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="mb-2 font-medium text-white">Zip Code</label>
//                   <input
//                     className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                     type="text"
//                     name="zipCode"
//                     value={profileData.zipCode}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="mb-2 font-medium text-white">Email</label>
//                   <input
//                     className="bg-transparent border-b-2 border-gray-300 text-white focus:border-red-500 focus:outline-none p-2"
//                     type="email"
//                     name="email"
//                     value={profileData.email}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="mt-8 text-center col-span-2">
//                   <button type="submit" className="bg-red-700 hover:bg-red-600 text-white text-xl px-8 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" disabled={isLoading}>
//                     {isLoading ? 'Saving...' : 'Save Profile'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileComponent;

import React, { useState, useEffect } from 'react';
import ProfileImage from './ProfileImage.png';
import Navbar from '../Navbar/NavbarComponent';
import Bike1 from './Frame.png';
import axios from 'axios';

const ProfileComponent = () => {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    dateOfBirth: '',
    phoneNumber: '',
    country: '',
    city: '',
    zipCode: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('http://localhost:1000/api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const profileData = res.data.profile;
        console.log('Profile Data:', profileData);
        setProfile({
          name: profileData.user?.name || '',
          address: profileData.address || '',
          dateOfBirth: profileData.dateOfBirth || '',
          phoneNumber: profileData.phoneNumber || '',
          country: profileData.country || '',
          city: profileData.city || '',
          zipCode: profileData.zipCode || '',
          email: profileData.user?.email || '',
          // password: '' // Do not pre-fill the password field for security reasons
        });
        setError('');
      } catch (err) {
        setError('Failed to load user profile');
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put('http://localhost:1000/api/profile/update', profile, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage('Profile updated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };
  

  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${ProfileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex items-center justify-center pt-32">
        <label className='text-2xl font-medium text-white'>Profile</label>
      </div>

      <form onSubmit={handleSubmit} className='flex'>
        <div className='space-y-10 mt-14'>
          <label className='flex ml-52 text-1xl font-medium text-white'>Full Name</label>
          <label className='flex ml-52 text-1xl font-medium text-white'>Address</label>
          <label className='flex ml-52 text-1xl font-medium text-white'>Date of Birth</label>
          <label className='flex ml-52 text-1xl font-medium text-white'>Phone Number</label>
          <label className='flex ml-52 text-1xl font-medium text-white'>Country</label>
          <label className='flex ml-52 text-1xl font-medium text-white'>City</label>
          <label className='flex ml-52 text-1xl font-medium text-white'>Zip Code</label>
        </div>

        <div className='space-y-7 mt-14 ml-16'>
          <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text' name="name" value={profile.name} onChange={handleChange} required />
          <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text' name="address" value={profile.address} onChange={handleChange} required />
          <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text' name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} required />
          <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text' name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} required />
          <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text' name="country" value={profile.country} onChange={handleChange} required />
          <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text' name="city" value={profile.city} onChange={handleChange} required />
          <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text' name="zipCode" value={profile.zipCode} onChange={handleChange} required />
        </div>

        <div className='space-y-10'>
          <img src={Bike1} alt="Frame" className="flex ml-40 h-40 z-0"></img>

          <div className='space-y-10'>
            <label className='flex ml-52 text-1xl font-medium text-white mt-14'>Email</label>
            {/* <label className='flex ml-52 text-1xl font-medium text-white mt-14'>Password</label> */}
          </div>
        </div>

        <div className='space-y-7 mt-52 ml-16'>
          <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text' name="email" value={profile.email} onChange={handleChange} disabled />
          {/* <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='password' name="password" value={profile.password} onChange={handleChange} /> */}

          <div className='pt-10'>
            <button type="submit" className="bg-red-700 text-white text-2xl px-5 py-2 rounded-lg z-10">Save</button>
          </div>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
    </div>
  );
};

export default ProfileComponent;

