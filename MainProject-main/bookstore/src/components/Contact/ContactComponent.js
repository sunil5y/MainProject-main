// ContactPage.js
import React, { useState } from "react";

const ContactPage = () => {

  const [formValues, setFormValues] = useState({ name: "", email: "", message: ""});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // Destructuring the event
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
    <div className='container mx-auto mt-20 ml-28 flex '>
      {/* Contact Form */}
      <div className='max-w-md ml-5'>
        <h1 className='text-3xl font-bold mb-6'>Contact Us</h1>
        <p className='mb-4'>Fill the form to contact via mail</p>

        <form onSubmit={handleSubmit} className='mb-6'>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
            <input type="text" id="name" name="name" value={formValues.name} onChange={handleChange} className='mt-1 pt-4 pr-36 border border-gray-300 rounded-md w-full' />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input type="email" id="email" name="email" value={formValues.email} onChange={handleChange} className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className='mb-6'>
            <label htmlFor='message' className='block text-sm font-medium text-gray-700'>Message</label>
            <textarea type="messaage" id="message" name="message" value={formValues.message} onChange={handleChange} rows='4' className='mt-1 p-2 border border-gray-300 rounded-md w-full'></textarea>
            {errors.message && <p>{errors.mesasge}</p>}
          </div>
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
            Submit
          </button>
        </form>
      </div>
      
      {/* Contact Information */}
      <div className='flex-1'>
        <div className='bg-gray-200 p-4 rounded-md text-center max-w-2xl h-4/5 ml-72 mr-10'>
          <h2 className='font-bold mb-8 text-3xl'>Contact Information</h2>
          <p className='mb-8'><strong>MotoLink</strong> revloize lorem ipsum dolor sit amet, consectetur adipiscing elit ips dolor sit amet, consectetur adipiscing elitum dolor sit amet, consectetur adipiscing elit </p>
          <p className='mb-8'><strong>Locations:</strong> New York, London, Tokyo</p>
          <p className='mb-8'><strong>Phone:</strong> +1 234 567 890</p>
          <p className='mb-8'><strong>Email:</strong> contact@example.com</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
