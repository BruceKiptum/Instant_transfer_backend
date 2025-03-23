const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    derivId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, unique: true },
    country: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
