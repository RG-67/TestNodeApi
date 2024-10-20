const connectDB = require('./db/db')
const express = require('express')
const app = express()
const router = require('./routes/routes')
const todolistRouter = require('./routes/todoListRoutes')
require('dotenv').config()

const port = 5000

// app.use('/app', router)

// todolist
app.use('/app/v1', todolistRouter)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}..`))
    } catch (error) {
        console.log(error)
    }
}

start()