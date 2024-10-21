const mongoose = require('mongoose')

const createNote = new mongoose.Schema({
    note: String, 
    userId: String, 
    date: String, 
    time: String
})


module.exports = mongoose.model('Notes', createNote)