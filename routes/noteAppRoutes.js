const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {createUser, loginUser, createNote, getNote, getAllNotes, updateNote, deleteNote, setBinNote, getBinNote, restoreNote,
    getNoteReminder} = require('../controller/noteAppController')


router.use(authorize, logger, express.json())

router.route('/user/createUser').post(createUser)
router.route('/user/loginUser').post(loginUser)
router.route('/note/createNote').post(createNote)
router.route('/note/getNote').post(getNote)
router.route('/note/getAllNotes').post(getAllNotes)
router.route('/note/updateNote').patch(updateNote)
router.route('/note/deleteNote').post(deleteNote)
router.route('/note/setBinNote').patch(setBinNote)
router.route('/note/getBinNote').post(getBinNote)
router.route('/note/restoreNote').patch(restoreNote)
router.route('/note/getReminderNote').post(getNoteReminder)


module.exports = router
