const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {createUser} = require('../controller/noteAppController')


router.use(authorize, logger, express.json())

router.route('/createUser').post(createUser)


module.exports = router
