// src/Routes/authRoute.js

const express = require('express');
const router = express.Router();
const { register, login, users } = require('../Controller/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/users', users);

module.exports = router;
