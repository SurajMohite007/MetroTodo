const Joi = require("joi");

const todoSchema = Joi.object({
  description: Joi.string().required().messages({
    'any.required': 'Please provide the Todo description',
    'string.empty': 'Please provide the Todo description',
  }),
});

module.exports = todoSchema;