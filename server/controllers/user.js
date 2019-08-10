const { sessName } = require('../config')
const { User } = require('../models')

const register = async ({ value, session }, res) => {
  const { name, email, password } = value.body

  try {
    const foundUser = await User.find({ $or: [{ email }, { name }] }).countDocuments()

    if (foundUser) {
      const error = JSON.stringify({ errors: { message: 'User already exists' } })

      throw new Error(error)
    }

    const user = new User({ name, email, password })
    const token = await user.generateAuthToken()

    session.accessToken = token
    await user.save()

    res.status(201).json({ user, success: true })
  } catch (err) {
    console.error(err)
    res.status(400).send(err.message)
  }
}

const UserController = { register }

module.exports = UserController
