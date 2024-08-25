import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeImage from '../Home/BackImage.jpg';
import Navbar from '../Navbar/NavbarComponent';

const CheckoutComponent = () => {
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    number: '',
    expiration: '', 
    cvv: '' 
  });
  const [book, setBook] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    const fetchCartTotalPrice = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:1000/api/cart/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cart = response.data.cart;
        const total = cart.books.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart total price:', error);
      }
    };

    fetchBook();
    fetchCartTotalPrice();
  }, [id]);

  const handlePaymentFormChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let errors = {};
    if (!paymentForm.name.trim()) errors.name = "Name is required";
    if (!paymentForm.number.trim()) errors.number = "Card number is required";
    else if (!/^\d{16}$/.test(paymentForm.number)) errors.number = "Invalid card number";
    if (!paymentForm.expiration.trim()) errors.expiration = "Expiration date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentForm.expiration)) errors.expiration = "Invalid expiration date (MM/YY)";
    if (!paymentForm.cvv.trim()) errors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(paymentForm.cvv)) errors.cvv = "Invalid CVV";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:1000/api/checkout',
          {
            ...paymentForm,
            book: book._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Checkout successful:', response.data);
        setSuccess(true);
      } catch (error) {
        console.error('Checkout error:', error);
        let errorMessage = 'An error occurred during checkout. Please try again.';
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = 'No response received from server. Please try again.';
        }
        setFormErrors({ submit: errorMessage });
      }
    }
  };

  const closePopup = () => {
    setSuccess(false);
    navigate('/');
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${HomeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundImage: `url(${HomeImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute w-full z-20">
        <Navbar />
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
          <div className="w-full lg:w-1/2 max-w-2xl bg-white bg-opacity-95 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={`peer w-full px-4 py-3 border-2 ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent`}
                        placeholder="Full Name"
                        value={paymentForm.name}
                        onChange={handlePaymentFormChange}
                      />
                      <label htmlFor="name" className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-semibold text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600">Full Name</label>
                      {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div className="relative">
                      <input
                        id="number"
                        name="number"
                        type="text"
                        className={`peer w-full px-4 py-3 border-2 ${formErrors.number ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent`}
                        placeholder="Card Number"
                        value={paymentForm.number}
                        onChange={handlePaymentFormChange}
                      />
                      <label htmlFor="number" className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-semibold text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600">Card Number</label>
                      {formErrors.number && <p className="text-red-500 text-xs mt-1">{formErrors.number}</p>}
                    </div>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <input
                          id="expiration"
                          name="expiration"
                          type="text"
                          placeholder="MM/YY"
                          className={`peer w-full px-4 py-3 border-2 ${formErrors.expiration ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent`}
                          value={paymentForm.expiration}
                          onChange={handlePaymentFormChange}
                        />
                        <label htmlFor="expiration" className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-semibold text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600">Expiration</label>
                        {formErrors.expiration && <p className="text-red-500 text-xs mt-1">{formErrors.expiration}</p>}
                      </div>
                      <div className="relative flex-1">
                        <input
                          id="cvv"
                          name="cvv"
                          type="text"
                          className={`peer w-full px-4 py-3 border-2 ${formErrors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-transparent`}
                          placeholder="CVV"
                          value={paymentForm.cvv}
                          onChange={handlePaymentFormChange}
                        />
                        <label htmlFor="cvv" className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-semibold text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600">CVV</label>
                        {formErrors.cvv && <p className="text-red-500 text-xs mt-1">{formErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>

                  {formErrors.submit && <p className="mt-4 text-sm text-red-600">{formErrors.submit}</p>}
                </form>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="py-3 px-6 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handlePaymentSubmit}
                  className="py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 max-w-md bg-white bg-opacity-95 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
            <div className="relative overflow-hidden cursor-pointer" onClick={() => setShowFullImage(true)}>
              <img 
                src={book.bookimage} 
                alt={book.title} 
                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Click to enlarge
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{book.title}</h3>
              <p className="text-4xl font-bold text-indigo-600">Rs.{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full animate-fade-in-down">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Payment Successful</h3>
            <p className="text-gray-600 mb-6">Your payment has been processed successfully!</p>
            <button 
              onClick={closePopup}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {showFullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowFullImage(false)}>
          <div className="max-w-4xl max-h-full p-4">
            <img 
              src={book.bookimage} 
              alt={book.title} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutComponent;