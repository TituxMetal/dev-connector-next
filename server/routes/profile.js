const router = require('express').Router()

const ProfileController = require('../controllers/profile')
const { isAuthenticated, validateBody } = require('../middlewares')
const { edit } = require('../validation/profiles')
const experience = require('../validation/experience')
const education = require('../validation/education')

/*
 @route     POST api/profiles
 @desc      Add or edit the current logged in user profile
 @params    company: string, website: string, location: string, status: string, skills: [string], bio: string, githubusername: string
 @access    Private
*/
router.post('/', isAuthenticated(true), validateBody(edit), ProfileController.edit)

/*
 @route     GET api/profiles
 @desc      Get all users profiles
 @access    Public
*/
router.get('/', ProfileController.all)

/*
  @route    GET api/profile/github/:username
  @desc     Get the 5 latest Github repos
  @access   Public
*/
router.get('/github/:username', ProfileController.github)

/*
 @route     GET api/profiles/me
 @desc      Get the current logged in user profile
 @access    Private
*/
router.get('/me', isAuthenticated(true), ProfileController.current)

/*
 @route     GET api/profiles/user/:userId
 @desc      Get profile by user id
 @access    Public
*/
router.get('/user/:userId', ProfileController.user)

/*
 @route     DELETE api/profiles
 @desc      Delete a user profile
 @access    Private
*/
router.delete('/', isAuthenticated(true), ProfileController.remove)

/*
 @route     PUT api/profiles/experience
 @desc      Add profile experience
 @access    Private
*/
router.put(
  '/experience',
  isAuthenticated(true),
  validateBody(experience),
  ProfileController.experience
)

/*
 @route     DELETE api/profiles/experience/:expId
 @desc      Delete experience from profile
 @access    Private
*/
router.delete('/experience/:expId', isAuthenticated(true), ProfileController.removeExp)

/*
 @route     PUT api/profiles/education
 @desc      Add profile education
 @access    Private
*/
router.put(
  '/education',
  isAuthenticated(true),
  validateBody(education),
  ProfileController.education
)

/*
 @route     DELETE api/profiles/education/:eduId
 @desc      Delete education from profile
 @access    Private
*/
router.delete('/education/:eduId', isAuthenticated(true), ProfileController.removeEdu)

module.exports = router
