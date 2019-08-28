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
    },
    experience: [
      {
        title: {
          type: String,
          required: true,
          trim: true
        },
        company: {
          type: String,
          required: true,
          trim: true
        },
        location: {
          type: String,
          trim: true
        },
        from: {
          type: Date,
          required: true
        },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String, trim: true }
      }
    ],
    education: [
      {
        school: {
          type: String,
          required: true,
          trim: true
        },
        degree: {
          type: String,
          required: true,
          trim: true
        },
        fieldofstudy: {
          type: String,
          trim: true
        },
        from: {
          type: Date,
          required: true
        },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String, trim: true }
      }
    ]
  },
  { timestamps: true }
)

const Profile = mongoose.model('profile', profileSchema)

module.exports = Profile
