const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength:[3, 'First name should be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength:[3, 'Last name should be at least 3 characters long'],
        },  
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:[6, 'Email should be at least 6 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength:[6, 'Password should be at least 6 characters long'],
    },
    socketId:{
        type: String,
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;