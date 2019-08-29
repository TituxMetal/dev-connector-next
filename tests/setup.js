const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { User, Profile } = require('../server/models')
const { mongoUri, mongoOptions, jwtOptions, jwtSecret } = require('../server/config')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'User One',
  email: 'userone@test.com',
  password: 'Test1234',
  token: ''
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwoToken = jwt.sign({ _id: userTwoId }, jwtSecret, jwtOptions)
const userTwo = {
  _id: userTwoId,
  name: 'User Two',
  email: 'usertwo@test.com',
  password: 'Test1234',
  token: userTwoToken
}

const experienceOneId = new mongoose.Types.ObjectId()
const experienceOne = {
  _id: experienceOneId,
  title: 'Experience One',
  company: 'Test Company',
  location: 'Test location',
  description: 'Experience one description',
  from: '2001-02-02',
  to: '2002-06-06'
}

const educationOneId = new mongoose.Types.ObjectId()
const educationOne = {
  _id: educationOneId,
  school: 'Education One',
  degree: 'Test Company',
  fieldofstudy: 'Testing',
  description: 'Education one description',
  from: '2001-02-02',
  to: '2002-06-06'
}

const profileOneId = new mongoose.Types.ObjectId()
const profileOne = {
  _id: profileOneId,
  user: userOneId,
  status: 'Tester',
  skills: ['Jest', 'Node'],
  experience: [experienceOne],
  education: [educationOne]
}

const setupDatabase = async () => {
  try {
    await mongoose.connect(
      mongoUri,
      mongoOptions
    )

    await Profile.deleteMany()
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Profile(profileOne).save()
  } catch (err) {
    console.error(err)
  }
}

const cleanupDatabase = async () => {
  try {
    await mongoose.disconnect()
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  experienceOneId,
  educationOneId,
  userOneId,
  userOne,
  userTwoId,
  userTwoToken,
  userTwo,
  profileOneId,
  profileOne,
  setupDatabase,
  cleanupDatabase
}
