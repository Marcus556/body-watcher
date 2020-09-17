const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (dataToValidate) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(512).required()
  });

  return schema.validate(dataToValidate)
}

//login validation
const loginValidation = (dataToValidate) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(512).required(),
  })

  return schema.validate(dataToValidate)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;