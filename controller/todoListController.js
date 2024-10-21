const note = require('../models/note')


const createNote = async (req, res) => {
    const notes = await note.create(req.body)
    res.status(200).json({notes})
}

const getAllNotes = async(req, res) => {
    const notes = await note.find();
    res.status(200).send({status: 'data successfully retrieved', data: notes})
}

const getNoteByUserId = async(req, res) => {
    const userNote = await note.findOne({userId: req.params.userId}).exec()
    res.status(200).send({status: 'data successfully retrieved', data: userNote})
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteByUserId
}