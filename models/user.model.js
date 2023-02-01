const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, minlength: 5, maxlength: 20, required: true },
    password: { type: String, minlength: 10, required: true },
    avatar: { type: String, required: false },
    phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);