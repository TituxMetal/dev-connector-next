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

const ProfileController = { edit }

module.exports = ProfileController
