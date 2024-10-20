const mongoose = require('mongoose')

const createNoteSchema = new mongoose.Schema({
    note: String, 
    userId: String, 
    date: String, 
    time: String
})

module.exports = mongoose.model('Notes', createNoteSchema)