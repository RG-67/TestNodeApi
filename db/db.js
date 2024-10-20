const mongoose = require('mongoose')



const connectDB = (url) => {
    return mongoose.connect(url).then(() => console.log('connect with database')).catch((err) => console.log(err))
}

module.exports = connectDB