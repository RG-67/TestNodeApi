const express = require('express')
const app = express()
const {products, people} = require('./data')
const logger = require('./logger')
const authorize = require('./authorize')

app.use(authorize, logger, express.json())
app.get('/app/products', (req, res) => {
    const filteredProduct = products.map((products) => {
        const {name, description} = products
        return {name, description}
    })
    res.json({"status": true, "msg": "product successfully retrieved", "data": filteredProduct})
})
app.get('/app/singleProduct/:productId', (req, res) => {
    const {productId} = req.params
    const singleProduct = products.find((product) => product.id === Number(productId))
    if (!singleProduct) {
        return res.json({'status': false, 'msg': 'product not found', "data": {}})
    }
    return res.json({'status': true, 'msg': 'product successfully retrieved', "data": singleProduct})
})
app.get('/app/products/query', (req, res) => {
    const {search, limit} = req.query;
    let sortedProducts = [...products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.match(search)
        })
    }
    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({"status": false, "msg": "product not found", "data":[]})
    }
    return res.status(200).json({"status": true, "msg": "product successfully retrieved", "data": sortedProducts})
})
app.post('/app/people', (req, res) => {
    const {id, name} = req.body
    const newPeople = people.find((person) => person.id === Number(id) && person.name === name)
    if(!newPeople) {
        return res.status(200).json({"status": false, "msg": "data not found", "data": {}})
    } else {
        return res.status(200).json({"status": true, "msg": "data successfully retrieved", "data": newPeople})
    }
})
app.all('*', (req, res) => {
    res.status(404).json({"status": false, "msg": "invalid request", "data": []});
})
app.listen(5000, () => {
    console.log('server is listening on port 5000..');
})