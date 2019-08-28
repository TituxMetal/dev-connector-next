const Joi = require('@hapi/joi')

const school = Joi.string()
  .min(4)
  .max(40)
  .trim()
  .required()
  .label('School field')
const degree = Joi.string()
  .min(4)
  .max(40)
  .trim()
  .required()
  .label('Degree field')
const fieldofstudy = Joi.string()
  .min(4)
  .max(40)
  .trim()
  .required()
  .label('Field Of Study field')
const from = Joi.date()
  .required()
  .label('From field')
const current = Joi.boolean()
  .default(false)
  .label('Current field')
const to = Joi.date()
  .min(Joi.ref('from'))
  .max('now')
  .when(Joi.ref('current'), {
    is: Joi.boolean()
      .valid(false)
      .required(),
    then: Joi.required()
  })
  .label('To field')
const description = Joi.string()
  .min(10)
  .optional()
  .trim()
  .label('Description field')

module.exports = Joi.object().keys({
  school,
  degree,
  fieldofstudy,
  from,
  to,
  current,
  description
})
