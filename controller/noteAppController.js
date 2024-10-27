const users = require('../models/user')
const utils = require('../utility/utils')

const createUser = async (req, res) => {
    try {
        const {name, phoneNumber, emailId, password} = req.body;
        const userId = utils.generateUserId();
        const date = Number(utils.getDate());
        const time = utils.getTime();
        const user = await users.create({userId, name, phoneNumber, emailId, password, date, time});
        return res.status(200).json({status: true, msg: 'User successfully created', data: user});
    } catch (error) {
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


module.exports = {
    createUser
}