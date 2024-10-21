const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {createNote, getAllNotes, getNoteByUserId} = require('../controller/todoListController')


router.use(authorize, logger, express.json())


router.route('/notes').post(createNote).get(getAllNotes)
router.route('/notes/:userId').get(getNoteByUserId)

module.exports = router