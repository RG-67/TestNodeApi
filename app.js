const express = require('express')
const app = express()
const router = require('./routes/routes')

app.use('/app', router)

app.listen(5000, () => {
    console.log('server is listening on port 5000..');
})