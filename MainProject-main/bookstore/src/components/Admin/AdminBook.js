import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/NavbarComponent';
const AdminBook = () => {
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    Price: '',
    genre: '',
    Description: '',
    Publisher:'',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBookFormChange = (e) => {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.author || !bookForm.Publisher || !bookForm.Price || !bookForm.genre || !bookForm.Description || !imageFile) {
      setFormError('Please fill in all fields and upload an image.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', bookForm.title);
      formData.append('author', bookForm.author);
      formData.append('Publisher', bookForm.Publisher);
      formData.append('price', bookForm.Price);
      formData.append('genre', bookForm.genre);
      // formData.append('publicationDate', bookForm.publicationDate);
      // formData.append('isbn', bookForm.isbn);
      formData.append('description', bookForm.Description);
      formData.append('image', imageFile);

      const res = await axios.post('http://localhost:1000/api/auth/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Processing...', res.data);
      setFormError(''); // Clear any previous error
      setSuccess(true); // Show success message
      setBookForm({ title: '', author: '', price: '', genre: '', publicationDate: '', isbn: '', description: '' });
      setImageUrl(null);
    } catch (err) {
      console.error('Error during Process:', err.response ? err.response.data : err.message);
      setFormError('Failed');
      setSuccess(false); // Hide success message if there's an error
    }
  };

  const closePopup = () => {
    setSuccess(false); // Hide success message when popup is closed
  };

  return (
    <div className="relative h-screen">
      <div className="absolute w-full z-20">
      <Navbar />
      </div>
      <div className="flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg mt-20 h-4/5 w-4/5">
          
          <div className='text-center'>
            <label className=' font-bold text-gray-700 text-2xl'>Book Store Management</label>
          </div>
          
          <form onSubmit={handleBookSubmit}>
            <div className='flex space-x-10 mt-5'>
              <div className='space-y-9 mt-5 ml-16'>
                <label className='flex text-1xl font-medium'>Book Title</label>
                <label className='flex text-1xl font-medium'>Author</label>
                <label className='flex text-1xl font-medium'>Publisher</label>
                <label className='flex text-1xl font-medium'>Price</label>
                <label className='flex text-1xl font-medium'>Genre</label>
                {/* <label className='flex text-1xl font-medium'>Publication Date</label>
                <label className='flex text-1xl font-medium'>ISBN</label> */}
                <label className='flex text-1xl font-medium'>Description</label>
              </div>

              <div className='space-y-6 mt-7 ml-16'>
                <input name="title" value={bookForm.title} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter book title' />
                <input name="author" value={bookForm.author} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter author' />
                <input name="author" value={bookForm.Publisher} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter Publisher' />
                <input name="price" value={bookForm.Price} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter price' />
                <input name="genre" value={bookForm.genre} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter genre' />
                {/* <input name="publicationDate" value={bookForm.publicationDate} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='date' placeholder='Enter publication date' />
                <input name="isbn" value={bookForm.isbn} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' type='text' placeholder='Enter ISBN' /> */}
                <textarea name="description" value={bookForm.Description} onChange={handleBookFormChange} className='flex border border-gray-600 rounded-lg w-72 bg-transparent focus:ring-0 outline-none p-1' placeholder='Enter book description' rows="4"></textarea>
              </div>

              <div className=' pl-36 mt-5'>
                <div className="flex flex-col items-center justify-center">
                <div className="w-72 h-72 border border-gray-600 flex items-center justify-center">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Uploaded" className="object-cover w-fit h-fit" />
                  ) : (
                    <p className="text-gray-500">No image uploaded</p>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="mt-4"
                />
              </div>

              <div className='pt-5 space-x-4'>
                <button className="bg-black text-white text-lg px-6 py-1 rounded-lg z-10">Update</button>
                <button className="bg-red-700 text-white text-lg px-6 py-1 rounded-lg z-10">Delete</button>
                <button type="submit" className="bg-black text-white text-lg px-6 py-1 rounded-lg z-10">Add</button>
                <button type="button" className="bg-gray-200 text-red-700 text-lg px-6 py-1 rounded-lg z-10">Reset</button>
              </div>

              </div>
            </div>
          </form>

          {formError && <p className="text-red-500 text-center mt-5">{formError}</p>}
          {success && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Book successfully added</h3>
                <button onClick={closePopup} className="text-center mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBook;
