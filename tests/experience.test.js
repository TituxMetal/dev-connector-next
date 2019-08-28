const request = require('supertest')

const server = require('../server/app')
const Profile = require('../server/models/Profile')
const {
  profileOneId,
  profileOne,
  userOne,
  userOneId,
  userTwoToken,
  userTwoId,
  setupDatabase,
  cleanupDatabase
} = require('./setup')

describe('Profiles Routes', () => {
  const testExperience = {
    title: 'Tester',
    company: 'Testing Inc.',
    location: 'Testing city',
    description: 'Testing things',
    from: '2003-03-03',
    to: '2005-12-13',
    current: false
  }

  beforeEach(async () => {
    await setupDatabase()
    expect(await Profile.find().countDocuments()).toBe(1)
  })

  afterEach(async () => await cleanupDatabase())

  describe('PUT /api/profiles/experience => Add an experience to user profile', () => {
    it('should add experience to the profile of current logged in user', async () => {
      const { email, password } = userOne
      const res = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)
      const { token } = res.body.user
      const { body } = await request(server)
        .put('/api/profiles/experience')
        .set('Authorization', `Bearer ${token}`)
        .send(testExperience)
        .expect(200)

      expect(body.experience).toBeInstanceOf(Array)
      expect(body.experience[0].title).toBe(testExperience.title)
      expect(body.experience[0].company).toBe(testExperience.company)
      expect(body.experience[0].location).toBe(testExperience.location)
      expect(body.experience[0].current).toBe(testExperience.current)
      expect(body.experience[0].description).toBe(testExperience.description)
    })

    it('should return 400 if missing required fields', async () => {
      const { email, password } = userOne
      const res = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)
      const { token } = res.body.user
      const experience = {
        description: 'Experience description',
        location: 'Test city'
      }
      const { error } = await request(server)
        .put('/api/profiles/experience')
        .set('Authorization', `Bearer ${token}`)
        .send(experience)
        .expect(400)

      const { errors } = JSON.parse(error.text)

      expect(errors.title).toBe(`"Title field" is required`)
      expect(errors.company).toBe(`"Company field" is required`)
      expect(errors.from).toBe(`"From field" is required`)
      expect(errors.to).toBe(`"To field" is required`)
    })

    it('should return 400 if invalid data given', async () => {
      const { email, password } = userOne
      const res = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)
      const { token } = res.body.user
      const experience = {
        company: 123,
        location: 'az',
        description: 'azaze',
        from: 'az123',
        current: 'az'
      }
      const { error } = await request(server)
        .put('/api/profiles/experience')
        .set('Authorization', `Bearer ${token}`)
        .send(experience)
        .expect(400)

      const { errors } = JSON.parse(error.text)

      expect(errors.company).toBe(`"Company field" must be a string`)
      expect(errors.location).toBe(`"Location field" length must be at least 4 characters long`)
      expect(errors.from).toBe(`"From field" must be a number of milliseconds or valid date string`)
      expect(errors.current).toBe(`"Current field" must be a boolean`)
      expect(errors.description).toBe(
        `"Description field" length must be at least 10 characters long`
      )
    })

    it('should return error 404 if no profile found', async () => {
      const { error } = await request(server)
        .put('/api/profiles/experience')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .send(testExperience)
        .expect(404)

      const { errors } = JSON.parse(error.text)
      expect(errors.message).toBe('A profile must be created before adding experience')
    })

    it('should return error 401 if user is no authenticated', async () => {
      const { error } = await request(server)
        .put('/api/profiles/experience')
        .send(testExperience)
        .expect(401)

      const { errors } = JSON.parse(error.text)
      expect(errors.message).toBe('You must be authenticated')
    })
  })
})
