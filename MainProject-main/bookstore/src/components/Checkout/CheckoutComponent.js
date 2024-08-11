import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HomeImage from '../Home/BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';

const CheckoutComponent = () => {
  const [paymentForm, setPaymentForm] = useState({ name: '', number: '', expiration: '', cvv: '' });
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handlePaymentFormChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    if (!paymentForm.name.trim()) {
      errors.name = 'Full Name is required';
    }

    if (!paymentForm.number.trim()) {
      errors.number = 'Card Number is required';
    } else if (!/^\d{16}$/.test(paymentForm.number)) {
      errors.number = 'Card Number must be 16 digits';
    }

    if (!paymentForm.expiration.trim()) {
      errors.expiration = 'Expiration Date is required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentForm.expiration)) {
      errors.expiration = 'Expiration Date must be in MM/YY format';
    }

    if (!paymentForm.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching bike details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post('http://localhost:1000/api/auth/payment', paymentForm);
        console.log('Payment successful', res.data);
        setFormErrors({});
        setSuccess(true); // Show success message
      } catch (err) {
        console.error('Payment error:', err.response ? err.response.data : err.message);
        setFormErrors({ general: 'Error during payment' });
        setSuccess(false); // Hide success message if there's an error
      }
    }
  };

  const closePopup = () => {
    setSuccess(false); // Hide success message when popup is closed
  };

  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${HomeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>

      <form
        className="flex pt-20 ml-24 bg-opacity-60 bg-gray-800 rounded-lg p-8 shadow-lg"
        onSubmit={handlePaymentSubmit}
      >
        <div className="space-y-7 mt-14 ml-16 text-white">
          <label className="text-2xl font-semibold">Payment Details</label>

          <input
            className={`flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1 ${formErrors.name && 'border-red-500'}`}
            placeholder="Full Name"
            type="text"
            id="fullname"
            name="name"
            value={paymentForm.name}
            onChange={handlePaymentFormChange}
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

          <input
            className={`flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1 ${formErrors.number && 'border-red-500'}`}
            placeholder="Number"
            type="text"
            id="number"
            name="number"
            value={paymentForm.number}
            onChange={handlePaymentFormChange}
          />
          {formErrors.number && <p className="text-red-500 text-sm">{formErrors.number}</p>}

          <input
            className={`flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1 ${formErrors.expiration && 'border-red-500'}`}
            placeholder="Expiration (MM/YY)"
            type="text"
            id="expiration"
            name="expiration"
            value={paymentForm.expiration}
            onChange={handlePaymentFormChange}
          />
          {formErrors.expiration && <p className="text-red-500 text-sm">{formErrors.expiration}</p>}

          <input
            className={`flex border-0 border-b-2 w-72 text-white border-gray-300 bg-transparent focus:ring-0 outline-none p-1 ${formErrors.cvv && 'border-red-500'}`}
            placeholder="CVV"
            type="text"
            id="cvv"
            name="cvv"
            value={paymentForm.cvv}
            onChange={handlePaymentFormChange}
          />
          {formErrors.cvv && <p className="text-red-500 text-sm">{formErrors.cvv}</p>}

          <label className="flex text-xs font-medium text-gray-400">
            By clicking “Confirm Payment”, you agree to our store regulations.
          </label>

          {formErrors.general && <p className="text-red-500 text-sm mb-4">{formErrors.general}</p>}

          <div className="flex space-x-4">
            <button className="bg-gradient-to-r from-red-400 to-red-600 text-white text-lg px-4 py-1 rounded-lg hover:from-gray-600 hover:to-gray-400 transition-all duration-300">Cancel</button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-lg px-5 py-1 rounded-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300"
            >
              Confirm Payment
            </button>
          </div>
        </div>

        <div className="ml-80">
          <img src={book.bookimage} alt="Bike" className="h-96 object-cover rounded-lg shadow-lg" />

          <div className="text-center mt-4">
            <label className="block text-3xl font-bold text-gray-300">{book.title}</label>
            <label className="block text-3xl font-bold text-gray-300 mt-2">Rs. {book.Price}</label>
          </div>
        </div>
      </form>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Payment Successful</h3>
            <p>Your payment has been processed successfully!</p>
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

export default CheckoutComponent;
