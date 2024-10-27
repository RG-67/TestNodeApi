const mongoose = require('mongoose');

const createUser = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name should not empty']
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: [true, 'Phone Number should not empty']
    },
    emailId: {
        type: String,
        unique: true,
        required: [true, 'Email ID should not empty'],
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password should not empty']
    },
    date: {
        type: Number,
        required: [true, 'Date required']
    },
    time: {
        type: String,
        required: [true, 'Time required']
    }
}, {
    collection: 'user'
});


module.exports = mongoose.model('user', createUser)