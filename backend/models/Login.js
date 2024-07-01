const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    uid: { type: String, required: true },
    password: { type: String, required: true }
    // createdAt: { type: Date, default: Date.now }
});

const LoginModel = mongoose.model('Login', loginSchema);

module.exports = LoginModel;
