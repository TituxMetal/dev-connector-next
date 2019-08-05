const express = require('express')

const server = express()

server.use(express.json())

server.use((err, _req, res, _next) => {
  const { status = 500, message } = err
  res.status(status).json(message)
})

module.exports = server
