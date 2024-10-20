const {products, people} = require('../data')

const getAllProduct = (req, res) => {
    const filteredProduct = products.map((products) => {
        const {name, description} = products
        return {name, description}
    })
    res.json({"status": true, "msg": "product successfully retrieved", "data": filteredProduct})
}

const getProductById = (req, res) => {
    const {productId} = req.params
    const singleProduct = products.find((product) => product.id === Number(productId))
    if (!singleProduct) {
        return res.json({'status': false, 'msg': 'product not found', "data": {}})
    }
    return res.json({'status': true, 'msg': 'product successfully retrieved', "data": singleProduct})
}

const getProductsBySearchAndLimit = (req, res) => {
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
}

const postPeopleByIdAndName = (req, res) => {
    const {id, name} = req.body
    const newPeople = people.find((person) => person.id === Number(id) && person.name === name)
    if(!newPeople) {
        return res.status(200).json({"status": false, "msg": "data not found", "data": {}})
    } else {
        return res.status(200).json({"status": true, "msg": "data successfully retrieved", "data": newPeople})
    }
}

const putUpdatePeopleByIdAndName = (req, res) => {
    const {id} = req.params
    const {name} = req.body
    const findPeople = people.find((person) => person.id === Number(id))
    if (!findPeople) {
        return res.status(200).json({"status": false, "msg": "invalid id", "data": {}})
    } else {
        const updatedPerson = people.map((findPeople) => {
            if (findPeople.id === Number(id)) {
                findPeople.name = name
            }
            return findPeople
        })
        return res.status(200).json({"status": true, "msg": "perosn updated successfully", "data": updatedPerson})
    }
}

const deletePeopleById = (req,res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
        return res.status(200).json({"status": false, "msg": "invalid id", "data": []})
    } else {
        const updatedPeople = people.filter((personId) => 
            personId.id !== Number(req.params.id)
        )
        return res.status(200).send({status: true, msg: "perosn deleted successfully", data: updatedPeople})
    }
}

let getInvalidResponse = (req, res) => {
    res.status(404).json({"status": false, "msg": "invalid request", "data": []});
}

module.exports = {
    getAllProduct,
    getProductById,
    getProductsBySearchAndLimit,
    postPeopleByIdAndName,
    putUpdatePeopleByIdAndName,
    deletePeopleById,
    getInvalidResponse
}