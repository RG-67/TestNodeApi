const { default: mongoose, model } = require("mongoose");

const notesReminder = new mongoose.Schema({
    userId : {
        type: String,
        required: [true, 'userId should not empty']
    },
    userDatabaseId: {
        type: String,
        required: [true, 'userDatabaseId should not empty']
    },
    noteId: {
        type: String,
        required: [true, 'noteId should not empty']
    },
    noteDatabaseId: {
        type: String,
        required: [true, 'noteDatabaseId should not empty']
    },
    userToken: {
        type: String,
        required: [true, 'user token should not empty']
    },
    reminderDateTime: {
        type: String,
        required: [true, 'reminder date and time should not empty']
    },
    isSendNotification: {
        type: Number,
        default: 0
    }
}, {
    collection: 'note_reminder'
})


module.exports = mongoose.model('note_reminder', notesReminder);