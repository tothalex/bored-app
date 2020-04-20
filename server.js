// server.js
const express = require('express')
const serveStatic = require('serve-static')

const app = express()

const staticServe = serveStatic(`${__dirname}/dist`)

app.use('/', staticServe)
app.use('*', staticServe)

const port = process.env.PORT || 5000
app.listen(port)
console.log(`server started ${port}`)
