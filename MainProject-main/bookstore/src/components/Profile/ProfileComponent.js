import React from 'react';
import ProfileImage from './ProfileImage.png';
import Navbar from '../Navbar/NavbarComponent';
import Bike1 from './Frame.png';

const ProfileComponent = () => {
  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${ProfileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="flex items-center justify-center pt-32">
        <label className='text-2xl font-medium text-white'>Profile</label>
      </div>

      <div className='flex'>
        <div className='space-y-10 mt-14'>
            <label className='flex ml-52 text-1xl font-medium text-white'>Full Name</label>
            <label className='flex ml-52 text-1xl font-medium text-white'>Address</label>
            <label className='flex ml-52 text-1xl font-medium text-white'>Date of Birth</label>
            <label className='flex ml-52 text-1xl font-medium text-white'>Phone Number</label>
            <label className='flex ml-52 text-1xl font-medium text-white'>Country</label>
            <label className='flex ml-52 text-1xl font-medium text-white'>City</label>
            <label className='flex ml-52 text-1xl font-medium text-white'>Zip Code</label>
        </div>

        <div className='space-y-7 mt-14 ml-16 '>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>
        </div>

        <div className='space-y-10'>
            <img src={Bike1} alt="Frame" className="flex ml-40 h-40 z-0"></img>

            <div className='space-y-10'>
              <label className='flex ml-52 text-1xl font-medium text-white mt-14'>Email</label>
              <label className='flex ml-52 text-1xl font-medium text-white mt-14'>Password</label>
            </div>
        </div>

        <div className='space-y-7 mt-52 ml-16'>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>
            <input className='flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1' type='text'></input>

            <div className='pt-10'>
                <button className="bg-red-700 text-white text-2xl px-5 py-2 rounded-lg z-10">Save</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
