const httpMode = require('http')
const portNumber = 5000
httpMode.createServer((req, res) => {
    res.end(`Server listen to port number ${portNumber}`)
}).listen(portNumber)

