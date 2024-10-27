const mongoose = require('mongoose')

const createNote = new mongoose.Schema({
    note: {
        type: String,
        required: [true, 'note should not empty']
    },
    userId: {
        type: String,
        required: [true, 'user id should not empty'],
        unique: true
    },
    date: {
        type: String,
        required: [true, 'date should not empty']
    },
    time: {
        type: String,
        required: [true, 'time should not empty']
    }
})


// module.exports = mongoose.model('notes', createNote)

