const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {createNoteSchema} = require('../controller/todoListController')


router.use(authorize, logger, express.json())


router.route('/notes').post(createNoteSchema)

module.exports = router