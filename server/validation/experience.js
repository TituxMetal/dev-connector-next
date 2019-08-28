const Joi = require('@hapi/joi')

const title = Joi.string()
  .min(4)
  .max(40)
  .trim()
  .required()
  .label('Title field')
const company = Joi.string()
  .min(4)
  .max(40)
  .trim()
  .required()
  .label('Company field')
const location = Joi.string()
  .min(4)
  .max(40)
  .trim()
  .required()
  .label('Location field')
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
  title,
  company,
  location,
  from,
  to,
  current,
  description
})
