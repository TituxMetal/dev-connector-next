const request = require('supertest')

const server = require('../server/app')
const Profile = require('../server/models/Profile')
const { educationOneId, userOne, userTwoToken, setupDatabase, cleanupDatabase } = require('./setup')

describe('Profiles Routes', () => {
  const testEducation = {
    school: 'Testing School',
    degree: 'Test',
    fieldofstudy: 'Testing things',
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

  describe('PUT /api/profiles/education => Add an education to user profile', () => {
    it('should add education to the profile of current logged in user', async () => {
      const { email, password } = userOne
      const res = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)
      const { token } = res.body.user
      const { body } = await request(server)
        .put('/api/profiles/education')
        .set('Authorization', `Bearer ${token}`)
        .send(testEducation)
        .expect(200)

      expect(body.education).toBeInstanceOf(Array)
      expect(body.education[0].school).toBe(testEducation.school)
      expect(body.education[0].degree).toBe(testEducation.degree)
      expect(body.education[0].fieldofstudy).toBe(testEducation.fieldofstudy)
      expect(body.education[0].current).toBe(testEducation.current)
      expect(body.education[0].description).toBe(testEducation.description)
    })

    it('should return 400 if missing required fields', async () => {
      const { email, password } = userOne
      const res = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)
      const { token } = res.body.user
      const education = {
        description: 'Education description',
        fieldofstudy: 'Test'
      }
      const { error } = await request(server)
        .put('/api/profiles/education')
        .set('Authorization', `Bearer ${token}`)
        .send(education)
        .expect(400)

      const { errors } = JSON.parse(error.text)

      expect(errors.school).toBe(`"School field" is required`)
      expect(errors.degree).toBe(`"Degree field" is required`)
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
      const education = {
        school: 'az',
        degree: 123,
        description: 'azaze',
        from: 'az123',
        current: 'az'
      }
      const { error } = await request(server)
        .put('/api/profiles/education')
        .set('Authorization', `Bearer ${token}`)
        .send(education)
        .expect(400)

      const { errors } = JSON.parse(error.text)

      expect(errors.school).toBe(`"School field" length must be at least 4 characters long`)
      expect(errors.degree).toBe(`"Degree field" must be a string`)
      expect(errors.from).toBe(`"From field" must be a number of milliseconds or valid date string`)
      expect(errors.current).toBe(`"Current field" must be a boolean`)
      expect(errors.description).toBe(
        `"Description field" length must be at least 10 characters long`
      )
    })

    it('should return error 404 if no profile found', async () => {
      const { error } = await request(server)
        .put('/api/profiles/education')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .send(testEducation)
        .expect(404)

      const { errors } = JSON.parse(error.text)
      expect(errors.message).toBe('A profile must be created before adding education')
    })

    it('should return error 401 if user is not authenticated', async () => {
      const { error } = await request(server)
        .put('/api/profiles/education')
        .send(testEducation)
        .expect(401)

      const { errors } = JSON.parse(error.text)
      expect(errors.message).toBe('You must be authenticated')
    })
  })

  describe('DELETE /api/profiles/education/:eduId => Delete an education from profile', () => {
    it('should delete an education from user profile', async () => {
      const { email, password } = userOne
      const res = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)
      const { token } = res.body.user
      const { body } = await request(server)
        .delete(`/api/profiles/education/${educationOneId}`)
        .set('Authorization', `${token}`)
        .expect(200)

      expect(body.education.length).toBe(0)
    })

    it('should return error 401 if user is not authenticated', async () => {
      const { error } = await request(server)
        .delete(`/api/profiles/education/${educationOneId}`)
        .expect(401)

      const { errors } = JSON.parse(error.text)
      expect(errors.message).toBe('You must be authenticated')
    })

    it('should return error 404 if invalid education id given', async () => {
      const { email, password } = userOne
      const res = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)
      const { token } = res.body.user
      const { error } = await request(server)
        .delete(`/api/profiles/education/123abc`)
        .set('Authorization', `${token}`)
        .expect(404)

      const { errors } = JSON.parse(error.text)
      expect(errors.message).toBe('No education found, invalid education id')
    })
  })
})
