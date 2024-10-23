const note = require('../models/note')



const createNote = async (req, res) => {
    try {
        const notes = await note.create(req.body)
        res.status(200).json({notes})   
    } catch (error) {
        console.log(error);
        let errMsg = "";
        if (error.name === 'ValidationError') {
            ['note', 'userId', 'date', 'time'].forEach(field => {
                if (error.errors[field]) {
                    errMsg = error.errors[field].message;
                }
            });
        }
        if (error.code === 11000 && error.keyValue.userId) {            
            res.status(200).send({status: false, userError: `${error.keyValue.userId} already exists`})
        }
        res.status(200).send({status: false, ErrorMsg: errMsg})   
    }
}

const getAllNotes = async(req, res) => {
    const notes = await note.find();
    if (notes !== null) {
        res.status(200).send({status: true, msg: 'data successfully retrieved', data: notes})   
    } else {
        res.status(200).send({status: false, msg: 'data not found', data: []})
    }
}

const getNoteByUserId = async(req, res) => {
    const userNote = await note.findOne({userId: req.params.userId}).exec()
    if (userNote !== null) {
        res.status(200).send({status: true, msg: 'data successfully retrieved', data: userNote})
    } else {
        res.status(200).send({status: false, msg: 'invalid user id', data: {}})
    }
}

const updateNoteById = async(req, res) => {
    try {
        const {id: noteId} = req.params
        const noteRes = await note.findOneAndUpdate({_id: noteId}, req.body, {
            new: true,
            runValidators: true
        })
        if (!noteRes) {
            res.status(200).send({status: false, msg: 'data updation failed', data: {}})
        } else {
            res.status(200).send({status: true, msg: 'data updated successfully', data: noteRes})
        }
    } catch (error) {
        res.status(200).send({status: false, msg: `data note found by this id - ${req.params.id}`, data: {}})
    }
}

const deleteNote = async(req, res) => {
    try {
        const {id: noteId} = req.params
        const deleteNote = await note.findOneAndDelete({_id: noteId})
        if (!deleteNote) {
            res.status(200).send({status: false, msg: 'data not deleted'})
        } else {
            res.status(200).send({status: true, msg: 'data deleted successfully'})
        }
    } catch (error) {
        res.status(200).send({status: false, msg: `data note found by this id - ${req.params.id}`})
    }
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteByUserId,
    updateNoteById,
    deleteNote
}