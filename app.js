const express = require('express')
const app = express()

app.get('/app', function (req, res) {
    res.status(200).end(`Node world..`)
})
app.all('*', (req, res) => {
    res.status(404).send('Not found..')
})
app.listen(5000, () => {
    console.log('server is listening on port 5000..');
    
})