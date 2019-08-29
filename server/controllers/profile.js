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

const remove = async ({ user }, res) => {
  try {
    if (!user) {
      return res.status(401).json({ errors: { message: 'You must be authenticated' } })
    }

    await Profile.findOneAndRemove({ user: user._id })
    res.status(204).json({ success: { message: 'Profile successfully deleted' } })
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

const experience = async ({ user, body }, res) => {
  try {
    if (!user) {
      return res.status(401).json({ errors: { message: 'You must be authenticated' } })
    }

    const profile = await Profile.findOne({ user })

    if (!profile) {
      return res
        .status(404)
        .json({ errors: { message: 'A profile must be created before adding experience' } })
    }

    const newExperience = { ...body }

    profile.experience.unshift(newExperience)

    await profile.save()

    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

const removeExp = async ({ user, params }, res) => {
  try {
    const expId = params.expId

    if (!ObjectId.isValid(expId)) {
      return res
        .status(404)
        .json({ errors: { message: 'No experience found, invalid experience id' } })
    }

    if (!user) {
      return res.status(401).json({ errors: { message: 'You must be authenticated' } })
    }

    const profile = await Profile.findOne({ user })

    if (!profile) {
      return res.status(404).json({ errors: { message: 'No profile found' } })
    }

    profile.experience = profile.experience.filter(experience => experience.id !== expId)

    await profile.save()

    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

const education = async ({ user, body }, res) => {
  try {
    if (!user) {
      return res.status(401).json({ errors: { message: 'You must be authenticated' } })
    }

    const profile = await Profile.findOne({ user })

    if (!profile) {
      return res
        .status(404)
        .json({ errors: { message: 'A profile must be created before adding education' } })
    }

    const newEducation = { ...body }

    profile.education.unshift(newEducation)

    await profile.save()

    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

const removeEdu = async ({ user, params }, res) => {
  try {
    const eduId = params.eduId

    if (!ObjectId.isValid(eduId)) {
      return res
        .status(404)
        .json({ errors: { message: 'No education found, invalid education id' } })
    }

    if (!user) {
      return res.status(401).json({ errors: { message: 'You must be authenticated' } })
    }

    const profile = await Profile.findOne({ user })

    if (!profile) {
      return res.status(404).json({ errors: { message: 'No profile found' } })
    }

    profile.education = profile.education.filter(education => education.id !== eduId)

    await profile.save()

    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send(err.message)
  }
}

const ProfileController = {
  all,
  current,
  remove,
  edit,
  education,
  experience,
  removeEdu,
  removeExp,
  user
}

module.exports = ProfileController
