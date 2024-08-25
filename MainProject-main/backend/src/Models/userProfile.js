// models/profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullname: {
        type: String,
    },
    address: {
        type: String 
    },
    dateOfBirth: {
        type: String,
    },
    phoneNumber: {
        type: Number 
    },
    country: {
        type: String,
    },
    city: {
        type: String 
    },
    zipCode: {
        type: Number,
    },
    ProfilePic:{
        type:String,
        required:false,
    }
});

module.exports = mongoose.model('Profile', profileSchema);