const router = require('express').Router()

const ProfileController = require('../controllers/profile')
const { isAuthenticated, validateBody } = require('../middlewares')
const { edit } = require('../validation/profiles')

/*
 @route     POST api/profiles
 @desc      Add or edit the current logged in user profile
 @params    company: string, website: string, location: string, status: string, skills: [string], bio: string, githubusername: string
 @access    Private
*/
router.post('/', isAuthenticated, validateBody(edit), ProfileController.edit)

/*
 @route     GET api/profiles
 @desc      Get all users profiles
 @access    Public
*/
router.get('/', ProfileController.all)

/*
 @route     GET api/profiles/me
 @desc      Get the current logged in user profile
 @access    Private
*/
router.get('/me', isAuthenticated, ProfileController.current)

/*
 @route     GET api/profiles/user/:userId
 @desc      Get profile by user id
 @access    Public
*/
router.get('/user/:userId', ProfileController.user)

module.exports = router
