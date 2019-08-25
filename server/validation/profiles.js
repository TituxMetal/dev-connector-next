const Joi = require('@hapi/joi')

const company = Joi.string()
  .optional()
  .min(4)
  .trim()
  .label('Company field')
const website = Joi.string()
  .optional()
  .min(4)
  .trim()
  .label('Website field')
const location = Joi.string()
  .optional()
  .min(4)
  .trim()
  .label('Location field')
const bio = Joi.string()
  .optional()
  .min(10)
  .trim()
  .label('Bio field')
const githubusername = Joi.string()
  .optional()
  .trim()
  .label('GitHub Username field')

const skills = Joi.string()
  .required()
  .min(4)
  .trim()
  .label('Skills field')
const status = Joi.string()
  .required()
  .min(4)
  .trim()
  .label('Status field')
const social = {
  youtube: Joi.string()
    .optional()
    .uri()
    .label('Youtube social field')
    .trim(),
  linkedin: Joi.string()
    .optional()
    .uri()
    .label('LinkedIn social field')
    .trim(),
  twitter: Joi.string()
    .optional()
    .uri()
    .label('Twitter social field')
    .trim(),
  facebook: Joi.string()
    .optional()
    .uri()
    .label('Facebook social field')
    .trim()
}

const edit = Joi.object().keys({
  company,
  website,
  location,
  bio,
  githubusername,
  skills,
  status,
  social
})

module.exports = { edit }
