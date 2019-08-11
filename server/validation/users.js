const Joi = require('@hapi/joi')

const name = Joi.string()
  .min(4)
  .max(254)
  .trim()
  .label('Name field')
const email = Joi.string()
  .email()
  .trim()
  .label('Email field')
const password = Joi.string()
  .min(8)
  .max(30)
  .trim()
  .label('Password field')

const isUpdate = field =>
  Joi.when('$update', {
    is: Joi.boolean()
      .valid(true)
      .required(),
    then: field.optional(),
    otherwise: field.required()
  })

const register = Joi.object().keys({
  name: isUpdate(name),
  email: isUpdate(email),
  password: isUpdate(password)
})

module.exports = { register }
