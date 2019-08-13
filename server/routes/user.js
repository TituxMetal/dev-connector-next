const router = require('express').Router()

const UserController = require('../controllers/user')
const { validateBody } = require('../middlewares')
const { login, register } = require('../validation/users')

/*
 @route     POST api/users/register
 @desc      Register user
 @params    name: string, email: string, password: string
 @access    Public
*/
router.post('/register', validateBody(register, false), UserController.register)

/*
 @route     POST api/users/login
 @desc      Login user
 @params    email: string, password: string
 @access    Public
*/
router.post('/login', validateBody(login, false), UserController.login)

module.exports = router
