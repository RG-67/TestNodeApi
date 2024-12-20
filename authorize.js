const jsonToken = require('jsonwebtoken');
const authorize = (req, res, next) => {
    const authKey = req.headers.authorization;
    const projectAuthKey = process.env.TOKEN_KEY;

    if (!authKey || !authKey.startsWith('Bearer ')) {
        return res.status(401).json({"status": false, "msg": "Authentication token is required", "data": {}});
    } else {
        const token = authKey.split(' ')[1];
        if(token !== projectAuthKey) {
            return res.status(401).json({"status": false, "msg": "Invalid token", "data": {}});
        } else {
            next();
        }
    }
    // jsonToken.verify(token, projectAuthKey, (err, decoded) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(401).json({"status": false, "msg": "invalid or expired key", "data": {}});
    //     }
    //     next()
    // })
}

module.exports = authorize