const ObjectId = require('mongoose').Types.ObjectId

const { Profile } = require('../models')

const edit = async ({ user, value }, res) => {
  const data = value.body

  try {
    if (!user) {
      const error = JSON.stringify({ errors: { message: 'You must be authenticated' } })

      throw new Error(error)
    }

    const profileFields = data
    profileFields.skills = data.skills.split(',').map(skill => skill.trim())

    const profile = await Profile.findOneAndUpdate(
      { user: user._id },
      { $set: profileFields },
      { new: true, upsert: true }
    )

    return res.status(200).json(profile)
  } catch (err) {
    console.error(err)
    res.status(401).send(err.message)
  }
}

const all = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])

    if (profiles.length === 0) {
      const error = JSON.stringify({ errors: { message: 'No profiles found' } })

      throw new Error(error)
    }

    res.status(200).json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(404).send(err.message)
  }
}

const current = async ({ user }, res) => {
  try {
    if (!user) {
      return res.status(400).json({ errors: { message: 'You must be authenticated' } })
    }

    const profile = await Profile.findOne({ user: user._id }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(404).json({ errors: { message: 'No profile found' } })
    }

    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

const user = async ({ params }, res) => {
  try {
    const user = params.userId

    if (!ObjectId.isValid(user)) {
      return res.status(404).json({ errors: { message: 'No profile found, invalid user id' } })
    }

    const profile = await Profile.findOne({ user }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(404).json({ errors: { message: 'No profile found for this user' } })
    }

    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

const ProfileController = { all, current, edit, user }

module.exports = ProfileController
