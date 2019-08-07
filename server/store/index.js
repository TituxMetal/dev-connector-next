const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const { redisHost, redisPort, redisPassword } = require('../config')

const options = { hos: redisHost, port: redisPort, pass: redisPassword }

module.exports = new RedisStore(options)
