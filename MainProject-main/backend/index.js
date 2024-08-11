// src/server.js or app.js

const express = require('express');
const connectDB = require("./src/Config/db");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const bikeRoutes = require('./src/Routes/bookRoute');
const profileRoutes = require("./src/Routes/profileRoute");
const authRoutes = require('./src/Routes/authRoute'); // Correct import

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bikeRoutes);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
