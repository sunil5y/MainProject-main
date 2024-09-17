import React, { useState } from "react";
import Navbar from "../Navbar/NavbarComponent";
import HomeImage from './Home.png';

const HomeComponent = () => {
  const [formValues, setFormValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formValues.name) tempErrors.name = "Name is required";
    if (!formValues.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formValues.message) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully");
      // handle form submission
    }
  };

  return (
    <div className="relative h-full" style={{ backgroundImage: `url(${HomeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      <div className="container mx-auto mt-20 ml-28 flex flex-wrap">
        {/* Contact Form */}
        <div className="max-w-md ml-5 bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="mb-4">Fill the form to contact via mail</p>
          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
        
        {/* Contact Information */}
        <div className="flex-1 bg-gray-200 bg-opacity-75 p-8 rounded-lg shadow-lg ml-5 mt-5 md:mt-0">
          <h2 className="font-bold mb-4 text-2xl text-center">Contact Information</h2>
          <p className="mb-4 text-center"><strong>MotoLink</strong> revloize lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className="mb-4 text-center"><strong>Locations:</strong> New York, London, Tokyo</p>
          <p className="mb-4 text-center"><strong>Phone:</strong> +1 234 567 890</p>
          <p className="mb-4 text-center"><strong>Email:</strong> contact@example.com</p>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
