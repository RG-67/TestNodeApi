const note = require('../models/note')


const createNoteSchema = async (req, res) => {
    const notes = await note.create(req.body)
    res.status(201).json({notes})
}

module.exports = {
    createNoteSchema
}