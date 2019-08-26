const request = require('supertest')

const server = require('../server/app')
const Profile = require('../server/models/Profile')
const {
  profileOneId,
  profileOne,
  userOne,
  userTwoToken,
  userTwoId,
  setupDatabase,
  cleanupDatabase
} = require('./setup')

describe('Profiles Routes', () => {
  const testProfile = {
    company: 'Testing Inc.',
    status: 'Tester',
    location: 'Testing',
    skills: 'Test, Jest, Node',
    bio: 'Test node app with jest',
    social: {
      youtube: 'https://youtube.com/testing',
      twitter: 'https://twitter.com/testing',
      linkedin: 'https://linkedin.com/testing',
      facebook: 'https://facebook.com/testing'
    }
  }

  beforeEach(async () => {
    await setupDatabase()
    expect(await Profile.find().countDocuments()).toBe(1)
  })

  afterEach(async () => await cleanupDatabase())

  describe('POST /api/profiles => Edit a user profile', () => {
    it('should add the profile of the current logged in user', async () => {
      const { body } = await request(server)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .send(testProfile)
        .expect(200)

      expect(await Profile.find().countDocuments()).toBe(2)

      const { _id, bio, company, location, status, skills, social } = await Profile.findOne({
        user: userTwoId
      })

      expect(body).toMatchObject({
        _id: _id.toString(),
        bio,
        company,
        location,
        status
      })
      expect(body.skills).toEqual(expect.arrayContaining(skills))
      expect(JSON.stringify(body.social)).toEqual(JSON.stringify(social))
    })

    it('should edit the current logged in user profile', async () => {
      const { _id, email, password } = userOne
      const res = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)

      const { token } = res.body.user
      profileOne.location = 'Testing location'
      const { location, skills, status } = profileOne
      const { body } = await request(server)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send({ location, status, skills: skills.toString() })
        .expect(200)

      expect(body.location).toEqual(profileOne.location)
      expect(body.skills).toEqual(expect.arrayContaining(profileOne.skills))
      expect(JSON.stringify(body.social)).toEqual(JSON.stringify(profileOne.social))
    })

    it('should return 401 if user is not authenticated', async () => {
      const { error } = await request(server)
        .post('/api/profiles')
        .send(testProfile)
        .expect(401)

      expect(await Profile.find().countDocuments()).toBe(1)

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toBe('You must be authenticated')
    })

    it('should return 400 if missing required fields', async () => {
      const { error } = await request(server)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .send({})
        .expect(400)

      expect(await Profile.find().countDocuments()).toBe(1)

      const { errors } = JSON.parse(error.text)

      expect(errors.skills).toEqual(`"Skills field" is required`)
      expect(errors.status).toEqual(`"Status field" is required`)
    })
  })
})