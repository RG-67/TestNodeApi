const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {createUser, loginUser, createNote, getNote, updateNote, deleteNote} = require('../controller/noteAppController')


router.use(authorize, logger, express.json())

router.route('/user/createUser').post(createUser)
router.route('/user/loginUser').post(loginUser)
router.route('/note/createNote').post(createNote)
router.route('/note/getNote').post(getNote)
router.route('/note/updateNote').patch(updateNote)
router.route('/note/deleteNote').post(deleteNote)


module.exports = router
