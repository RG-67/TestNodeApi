const users = require('../models/user')
const notes = require('../models/note')
const utils = require('../utility/utils')

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
        const {title, note, dbId, userId} = req.body;
        const noteId = utils.generateNoteId();
        const date = Number(utils.getDate());
        const time = utils.getTime();
        const noteCreate = await notes.create({noteId, title, note, dbId, userId, date, time});
        return res.status(200).json({status: true, msg: 'Note created successfully', data: noteCreate});
    } catch(error) {
        let errMsg = '';
        if (error.name === 'ValidationError') {
            ['title', 'note', 'databaseId', 'userId', 'date', 'time'].forEach(field => {
                if (error.errors[field]) {
                    errMsg = error.errors[field].message;
                }
            })
        }
        return res.status(409).json({status: false, msg: errMsg, data: {}})
    }
}


module.exports = {
    createUser,
    loginUser
}