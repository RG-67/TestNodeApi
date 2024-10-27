const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {createUser} = require('../controller/noteAppController')


router.use(authorize, logger, express.json())

router.route('/createNote').post(createUser)


module.exports = router
