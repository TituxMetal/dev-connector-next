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

module.exports = router
