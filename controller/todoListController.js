const note = require('../models/note')

// assert.equal(err.errors['note'].message, 'note should not empty')
    // assert.equal(err.errors['userId'].message, 'user id should not empty or already exists')
    // assert.equal(err.errors['date'].message, 'data should not empty')
    // assert.equal(err.errors['time'].message, 'time should not empty')

const createNote = async (req, res) => {
    try {
        const notes = await note.create(req.body)
        res.status(200).json({notes})   
    } catch (error) {
        let noteErrMsg = "", userErrMsg = "", dateErrMsg = "", timeErrMsg = "";
        if (error.name === 'ValidationError') {
            if (error.errors.note) {
                noteErrMsg = error.errors.note.message
            }   
            if (error.errors.userId) {
                userErrMsg = error.errors.userId.message
            }
            if (error.errors.date) {
                dateErrMsg = error.errors.date.message
            }
            if (error.errors.time) {
                timeErrMsg = error.errors.time.message
            }
        }
        if (error.code === 11000 && error.keyValue.userId) {            
            res.status(200).send({status: false, userError: `${error.keyValue.userId} already exists`})
        } else {
            res.status(200).send({status: false, ErrorMsg: [{noteError: noteErrMsg}, {userError: userErrMsg}, {dateError: dateErrMsg}, {timeErrMsg: timeErrMsg}]})   
        }
    }
}

const getAllNotes = async(req, res) => {
    const notes = await note.find();
    if (notes !== null) {
        res.status(200).send({status: true, msg: 'data successfully retrieved', data: []})   
    } else {
        res.status(200).send({status: false, msg: 'data not found', data: notes})
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

module.exports = {
    createNote,
    getAllNotes,
    getNoteByUserId
}