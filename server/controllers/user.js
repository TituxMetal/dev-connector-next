const { sessName } = require('../config')
const { User, Profile } = require('../models')

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

const login = async ({ session, value }, res) => {
  const { email, password } = value.body

  try {
    const user = await User.findByCredentials(email, password)
    const token = await user.generateAuthToken()

    session.accessToken = token
    user.token = token

    await user.save()

    res.json({ user, success: true })
  } catch (err) {
    console.error(err)
    res.status(400).send(err.message)
  }
}

const logout = async (req, res) => {
  try {
    if (!req.user) {
      const error = JSON.stringify({ errors: { message: 'You must be authenticated' } })

      throw new Error(error)
    }

    const { email, token } = req.user
    const logoutUser = await User.findOne({ $or: [{ email }, { token }] })

    logoutUser.token = ''

    await logoutUser.save()

    delete req.user

    delete req.session

    res.clearCookie(sessName)
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(401).send(err.message)
  }
}

const me = async ({ user }, res) =>
  user ? res.json({ user, success: true }) : res.json({ user: false, success: false })

const remove = async ({ user }, res) => {
  try {
    if (!user) {
      return res.status(401).json({ errors: { message: 'You must be authenticated' } })
    }

    await Profile.findOneAndRemove({ user })
    await User.findOneAndRemove({ _id: user })

    res.status(204).json({ success: { message: 'User successfully deleted' } })
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

const UserController = { login, logout, me, register, remove }

module.exports = UserController
