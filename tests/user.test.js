const request = require('supertest')

const server = require('../server/app')
const { User, Profile } = require('../server/models')
const {
  userOne,
  userTwo,
  userTwoId,
  userTwoToken,
  setupDatabase,
  cleanupDatabase
} = require('./setup')

describe('Users Routes', () => {
  const testUser = { name: 'test', email: 'test@test.com', password: 'test1234' }

  beforeEach(async () => {
    await setupDatabase()
    expect(await User.find().countDocuments()).toBe(2)
  })

  afterEach(async () => await cleanupDatabase())

  describe('POST /api/users/register => Register user', () => {
    it('should register a new user', async () => {
      const { body } = await request(server)
        .post('/api/users/register')
        .send(testUser)
        .expect(201)

      const { password } = await User.findOne({ email: testUser.email })

      expect(password).not.toEqual(testUser.password)
      expect(body.user.password).not.toBeDefined()
      expect(body.user.token).toBeDefined()
      expect(body.user.avatar).toBeDefined()

      const { name, email } = testUser

      expect(body.user).toMatchObject({ name, email })
    })

    it('should not create user if the same user name or email already exists', async () => {
      const { name, email, password } = userOne
      const { error } = await request(server)
        .post('/api/users/register')
        .send({ name, email, password })
        .expect(400)

      expect(await User.find().countDocuments()).toBe(2)

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toBeDefined()
      expect(errors.message).toBe('User already exists')
    })

    it('should not create user if invalid data given', async () => {
      const { error } = await request(server)
        .post('/api/users/register')
        .send({ name: '   abc   ', email: 'not an email' })
        .expect(400)

      expect(await User.find().countDocuments()).toBe(2)

      const { errors } = JSON.parse(error.text)

      expect(errors.name).toBeDefined()
      expect(errors.email).toBeDefined()
      expect(errors.password).toBeDefined()
      expect(errors.name).toBe('"Name field" length must be at least 4 characters long')
      expect(errors.email).toBe('"Email field" must be a valid email')
      expect(errors.password).toBe('"Password field" is required')
    })
  })

  describe('POST /api/users/login => Login user', () => {
    it('should login the user', async () => {
      const { _id, name, email, password } = userOne
      const { body } = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)

      expect(body.user).toMatchObject({ _id: _id.toString(), name, email })
      expect(body.user.token).toBeDefined()
      expect(body.success).toBe(true)
    })

    it('should return an error message if bad credentials given', async () => {
      const { email, password } = testUser
      const { error, body } = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(400)

      expect(body.user).not.toBeDefined()

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toBe('Unable to login. Bad credentials.')
    })

    it('should return an error message if invalid credentials given', async () => {
      const { error, body } = await request(server)
        .post('/api/users/login')
        .send({ email: '   invalid@email .com', password: '   ' })
        .expect(400)

      expect(body.user).not.toBeDefined()

      const { errors } = JSON.parse(error.text)

      expect(errors.email).toBeDefined()
      expect(errors.password).toBeDefined()
      expect(errors.email).toBe('"Email field" must be a valid email')
      expect(errors.password).toBe('"Password field" is not allowed to be empty')
    })
  })

  describe('POST /api/users/logout => Logout user', () => {
    it('should logout current authenticated user with token header', async () => {
      const { email, token } = userTwo
      const { body } = await request(server)
        .post('/api/users/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(body).toEqual({ success: true })

      const user = await User.findOne({ email })

      expect(user.token).toBe('')
    })

    it('should logout current authenticated user with session cookie', async () => {
      const { email, password } = userTwo
      const response = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)

      expect(response.header['set-cookie']).toBeDefined()

      const cookie = response.header['set-cookie'][0].split(';')[0]
      const { header, body } = await request(server)
        .post('/api/users/logout')
        .set('Cookie', cookie)
        .expect(200)

      expect(header['set-cookie'][0].split(';')[0]).toBe('token=')
      expect(body).toEqual({ success: true })

      const { token } = await User.findOne({ email })

      expect(token).toEqual('')
    })

    it('should return status 401 and an error message if user is already logged out', async () => {
      const { error } = await request(server)
        .post('/api/users/logout')
        .expect(401)

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toBe('You must be authenticated')
    })
  })

  describe('GET /api/users/me => Check user authentication', () => {
    it('should return the user data and success: true if the user is authenticated with bearer token', async () => {
      const { body } = await request(server)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .expect(200)

      expect(body.success).toBe(true)

      const { _id, name, email, token } = userTwo

      expect(body.user).toMatchObject({ _id: _id.toString(), name, email, token })
    })

    it('should return the user data and success: true if the user is authenticated with session cookie', async () => {
      const { _id, email, name, password, token } = userTwo
      const { header } = await request(server)
        .post('/api/users/login')
        .send({ email, password })
        .expect(200)

      expect(header['set-cookie'][0]).toBeDefined()

      const cookie = header['set-cookie'][0].split(';')[0]
      const { body } = await request(server)
        .get('/api/users/me')
        .set('Cookie', cookie)
        .expect(200)

      expect(body.user).toMatchObject({ _id: _id.toString(), name, email })
      expect(body.user.token).toBeDefined()
      expect(body.success).toBe(true)
    })

    it('should return user: false and success: false if the user is not authenticated', async () => {
      const { header, body } = await request(server)
        .get('/api/users/me')
        .expect(200)

      expect(header['set-cookie']).toBeDefined()

      const cookie = header['set-cookie'][0].split(';')[0]

      expect(cookie).toBe('token=')
      expect(body.user).toBe(false)
      expect(body.success).toBe(false)
    })
  })

  describe('DELETE /api/users => Delete a user', () => {
    it('should delete the current logged in user', async () => {
      expect(await User.find({ _id: userTwoId }).countDocuments()).toBe(1)

      await request(server)
        .delete('/api/users')
        .set('Authorization', `Bearer ${userTwoToken}`)
        .expect(204)

      expect(await User.findById(userTwoId)).toBeNull()
      expect(await Profile.findOne({ user: userTwoId })).toBeNull()
    })

    it('should return 401 if user is not authenticated', async () => {
      const { error } = await request(server)
        .delete('/api/users')
        .expect(401)

      const { errors } = JSON.parse(error.text)

      expect(errors.message).toEqual('You must be authenticated')
    })
  })
})
