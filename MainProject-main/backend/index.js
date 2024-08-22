// src/server.js or app.js

const express = require('express');
const connectDB = require("./src/Config/db");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser =require("cookie-parser")
const bikeRoutes = require('./src/Routes/bookRoute');
const profileRoutes = require("./src/Routes/profileRoute");
const cartRoutes = require('./src/Routes/cartRoute'); 
const authRoutes = require('./src/Routes/authRoute'); // Correct import
const checkoutRoutes = require('./src/Routes/paymentRoute');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bikeRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', checkoutRoutes);
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
