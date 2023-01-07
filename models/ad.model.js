const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, minlength: 10, maxlength: 50, required: true },
    content: { type: String, minlength: 20, maxlength: 1000, required: true },
    published: { type: Date, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Ad', adSchema);