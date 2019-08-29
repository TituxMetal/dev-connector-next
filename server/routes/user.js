const router = require('express').Router()

const UserController = require('../controllers/user')
const { isAuthenticated, validateBody } = require('../middlewares')
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

/*
 @route     POST api/users/logout
 @desc      Logout user
 @access    Private
*/
router.post('/logout', isAuthenticated, UserController.logout)

/*
 @route     GET api/users/me
 @desc      Check user authentication
 @access    Private
*/
router.get('/me', isAuthenticated, UserController.me)

/*
 @route     DELETE api/users
 @desc      Delete the current logged in user
 @access    Private
*/
router.delete('/', isAuthenticated, UserController.remove)

module.exports = router
