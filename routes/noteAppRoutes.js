const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {createUser, loginUser} = require('../controller/noteAppController')


router.use(authorize, logger, express.json())

router.route('/user/createUser').post(createUser)
router.route('/user/loginUser').post(loginUser)


module.exports = router
