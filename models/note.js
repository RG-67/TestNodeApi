const mongoose = require('mongoose')
const { collection } = require('./user')

const createNote = new mongoose.Schema({
    noteId: {
        type: String
    },
    title: {
        type: String,
        required: [true, 'title should not empty']
    },
    note: {
        type: String,
        required: [true, 'note should not empty']
    },
    databaseUserId: {
        type: String,
        required: [true, 'database user id missing']
    }, 
    userId: {
        type: String,
        required: [true, 'user id should not empty']
    },
    date: {
        type: Number,
        required: [true, 'date should not empty']
    },
    time: {
        type: String,
        required: [true, 'time should not empty']
    },
    isDelete: {
        type: Number,
        default: 0
    },
    isReminder: {
        type: Number,
        default: 0
    }
}, {
    collection: 'note'
})


module.exports = mongoose.model('note', createNote)

