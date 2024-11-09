const users = require('../models/user')
const notes = require('../models/note')
const noteReminders = require('../models/noteReminder')
const utils = require('../utility/utils')
const { token } = require('../utility/appCred')

// user api
const createUser = async (req, res) => {
    try {
        const {name, phoneNumber, emailId, password} = req.body;
        const userId = utils.generateUserId();
        const hassPass = await utils.setPassword(password);
        const date = Number(utils.getDate());
        const time = utils.getTime();
        const user = await users.create({userId, name, phoneNumber, emailId, password: hassPass, date, time});
        return res.status(200).json({status: true, msg: 'User successfully created', data: {}});
        // return res.status(200).json({status: true, msg: 'User successfully created', data: user});
    } catch (error) {
        console.log(error);
        let errMsg = '';
        if (error.name === 'ValidationError') {
            ['name', 'emaildId, password', 'date', 'time'].forEach(field => {
                if (error.errors[field]) {
                    errMsg = error.errors[field].message;
                }
            })
        }
        if (error.code === 11000) {
            errMsg = Object.keys(error.keyValue)[0];
            return res.status(409).json({status: false, msg: `${errMsg} already exists`, data: {}})
        }
        return res.status(400).json({status: false, msg: errMsg, data: {}})
    }
}

const loginUser = async (req, res) => {
    const {emailId, password} = req.body;
    try {
        const user = await users.findOne({emailId: emailId}).exec();
        if (user) {
            const pass = await utils.getPassword(password, user.password);
            if (pass) {
                return res.status(200).json({status: true, msg: 'Login successfully', data: {_id: user._id, userId: user.userId, name: user.name, phoneNumber: user.phoneNumber, emailId: user.emailId}});
            } else {
                return res.status(404).json({status: false, msg: 'Invalid password', data: {}});
            }
        } else {
            return res.status(404).json({status: false, msg: 'Invalid email id', data: {}});
        }
    } catch (error) {
        return res.status(404).json({status: false, msg: error, data: {}})
    }
}

// note api
const createNote = async (req, res) => {
    try {
        const {title, note, databaseUserId, userId, reminderDateTime} = req.body;
        // const {title, note, databaseUserId, userId} = req.body;
        const noteId = utils.generateNoteId();
        const date = Number(utils.getDate());
        const time = utils.getTime();
        const noteCreate = await notes.create({noteId, title, note, databaseUserId, userId, date, time});
        if (noteCreate && reminderDateTime !== '') {
            const noteReminderCreate = await noteReminders.create({userId, userDatabaseId: databaseUserId, noteId, noteDatabaseId: noteCreate._id, userToken: token, reminderDateTime, isSendNotification: 1});
        }
        return res.status(200).json({status: true, msg: 'Note created successfully', data: noteCreate});
    } catch(error) {
        console.log(error);
        let errMsg = '';
        if (error.name === 'ValidationError') {
            ['title', 'note', 'databaseUserId', 'date', 'time', 'userId', 'userDatabaseId', 'noteId', 'noteDatabaseId', 'userToken', 'reminderDateTime'].forEach(field => {
                if (error.errors[field]) {
                    errMsg = error.errors[field].message;
                }
            })
        }
        return res.status(409).json({status: false, msg: errMsg, data: {}});
    }
}

const getNote = async (req, res) => {
    try {
        const {noteDatabaseId, noteId, databaseUserId, userId} = req.body;
        const getUserNote = await notes.findOne({_id: noteDatabaseId, noteId: noteId, databaseUserId: databaseUserId, userId: userId}).exec();
        if (getUserNote) {
            res.status(200).json({status: true, msg: 'note retreived successfully', data: {noteDatabaseId: getUserNote._id, noteId: getUserNote.noteId, title: getUserNote.title, note: getUserNote.note, databaseUserId: getUserNote.databaseUserId, userId: getUserNote.userId}});
        } else {
            res.status(400).json({status: false, msg: 'note not found', data: {}});
        }
    } catch (error) {
        res.status(400).json({status: false, msg: 'Invalid request', data: {}});   
    }
}

const getAllNotes = async (req, res) => {
    try {
        const {databaseUserId, userId} = req.body;
        const findAllNotes = await notes.find({databaseUserId: databaseUserId, userId: userId, isDelete: 0}).exec();
        if (findAllNotes && findAllNotes.length > 0) {
            res.status(200).json({status: true, msg: 'Notes retreived successfully', data: findAllNotes});
        } else {
            res.status(400).json({status: false, msg: 'Notes not found', data: findAllNotes});
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Server error', data: []});
    }
}

const updateNote = async (req, res) => {
    try {
    const {noteDatabaseId, noteId, title, note, databaseUserId, userId} = req.body;
    const date = Number(utils.getDate());
    const time = utils.getTime();
    const updateData = {title: title, note: note, date: date, time: time}
    const updateNote = await notes.findOneAndUpdate({_id: noteDatabaseId, noteId: noteId, databaseUserId: databaseUserId, userId: userId}, updateData, {
        new: true,
        runValidators: true
    });
    if(updateNote) {
        return res.status(200).json({status: true, msg: 'Note updated successfully', data: updateNote});
    } else {
        return res.status(400).json({status: false, msg: 'Note updation faliled', data: {}});
    }   
    } catch (error) {
        return res.status(400).json({status: false, msg: 'Invalid request', data: {}});
    }
}

const deleteNote = async (req, res) => {
    try {
        const {noteDatabaseId, noteId, databaseUserId, userId} = req.body;
        const noteDelete = await notes.findOneAndDelete({_id: noteDatabaseId, noteId: noteId, databaseUserId: databaseUserId, userId: userId});
        if (noteDelete) {
            return res.status(200).json({status: true, msg: 'Note deleted successfully', data: {}});
        } else {
            return res.status(400).json({status: true, msg: 'Note deletion failed', data: {}});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({status: true, msg: 'Invalid request', data: {}});
    }
}

const setBinNote = async (req, res) => {
    try {
        const {noteDatabaseId, noteId, databaseUserId, userId} = req.body;
        const binNote = await notes.findOneAndUpdate({_id: noteDatabaseId, noteId: noteId, databaseUserId: databaseUserId, userId: userId}, {isDelete: 1}, {
            new: true,
            runValidators: true
        });
        if (binNote) {
            res.status(200).json({status: true, msg: 'Note saved to bin', data: {}});
        } else {
            res.status(400).json({status: true, msg: 'Invalid credentials', data: {}});
        }
    } catch (error) {
        res.status(400).json({status: true, msg: 'Invalid request', data: {}});
    }
}

const getBinNote = async (req, res) => {
    try {
        const {databaseUserId, userId} = req.body;
        const findAllNotes = await notes.find({databaseUserId: databaseUserId, userId: userId, isDelete: 1}).exec();
        if (findAllNotes && findAllNotes.length > 0) {
            res.status(200).json({status: true, msg: 'Notes retreived successfully', data: findAllNotes});
        } else {
            res.status(400).json({status: false, msg: 'Notes not found', data: []});
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Server error', data: []});
    }
}

const restoreNote = async (req, res) => {
    try {
        const {noteDatabaseId, noteId, databaseUserId, userId} = req.body;
        const binNote = await notes.findOneAndUpdate({_id: noteDatabaseId, noteId: noteId, databaseUserId: databaseUserId, userId: userId}, {isDelete: 0}, {
            new: true,
            runValidators: true
        });
        if (binNote) {
            res.status(200).json({status: true, msg: 'Note successfully restored', data: {}});
        } else {
            res.status(400).json({status: true, msg: 'Invalid credentials', data: {}});
        }
    } catch (error) {
        res.status(400).json({status: true, msg: 'Invalid request', data: {}});
    }
}


module.exports = {
    createUser,
    getNote,
    getAllNotes,
    loginUser,
    createNote,
    updateNote,
    deleteNote,
    setBinNote,
    getBinNote,
    restoreNote
}