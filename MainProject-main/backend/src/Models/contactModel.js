const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
    },
    email: {
        type: String 
    },
    message: {
        type: String,
    }
});

module.exports = mongoose.model('Contact', contactSchema);