const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const profileSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'user' },
    company: { type: String, trim: true },
    website: { type: String, trim: true },
    location: { type: String, trim: true },
    status: { type: String, required: true, trim: true },
    skills: { type: [String], required: true },
    bio: { type: String, trim: true },
    githubusername: { type: String, trim: true },
    social: {
      youtube: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String }
    }
  },
  { timestamps: true }
)

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
