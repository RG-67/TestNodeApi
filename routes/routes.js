const logger = require('../logger')
const authorize = require('../authorize')
const express = require('express')
const router = express.Router()
const {
    getAllProduct,
    getProductById,
    getProductsBySearchAndLimit,
    postPeopleByIdAndName,
    putUpdatePeopleByIdAndName,
    deletePeopleById,
    getInvalidResponse
} = require('../controller/controller')


router.use(authorize, logger, express.json())

/*
router.get('/products', getAllProduct)
router.get('/singleProduct/:productId', getProductById)
router.get('/products/query', getProductsBySearchAndLimit)
router.post('/people', postPeopleByIdAndName)
router.put('/people/:id', putUpdatePeopleByIdAndName)
router.delete('/people/:id', deletePeopleById)
router.all('*', getInvalidResponse)
*/

router.route('/products').get(getAllProduct)
router.route('singleProduct/:productId').get(getProductById)
router.route('/products/query').get(getProductsBySearchAndLimit)
router.route('/people').post(postPeopleByIdAndName)
router.route('/people/:id').put(putUpdatePeopleByIdAndName).delete(deletePeopleById)
router.route('*').all(getInvalidResponse)


module.exports = router