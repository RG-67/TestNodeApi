const authorize = (req, res, next) => {
    const {authKey} = req.query
    const projectAuthKey = "abcde12345"
    if(authKey === projectAuthKey) {
        next()
    } else {
        res.status(401).json({"status": false, "msg": "unothorize key", "data": {}})
    }
}

module.exports = authorize