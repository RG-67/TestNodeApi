const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {createNote, getAllNotes, getNoteByUserId, updateNoteById, deleteNote} = require('../controller/todoListController')


router.use(authorize, logger, express.json())


router.route('/notes').post(createNote).get(getAllNotes)
router.route('/notes/:userId').get(getNoteByUserId)
router.route('/notes/:id').put(updateNoteById).delete(deleteNote)

module.exports = router