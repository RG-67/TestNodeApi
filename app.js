const express = require('express')
const app = express()
const path = require('path')
const {products, people} = require('./data')

app.get('/app/products', function (req, res) {
    const filteredProduct = products.map((products) => {
        const {name, description} = products
        return {name, description}
    })
    res.json(filteredProduct)
})
app.get('/app/singleProduct/:productId', (req, res) => {
    const {productId} = req.params
    const singleProduct = products.find((product) => product.id === Number(productId))
    if (!singleProduct) {
        return res.json({'status': false, 'msg': 'product not found'})
    }
    return res.send(singleProduct)
})
app.all('*', (req, res) => {
    res.status(404).send('Not found..')
})
app.listen(5000, () => {
    console.log('server is listening on port 5000..');
    
})