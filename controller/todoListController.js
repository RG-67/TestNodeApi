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