import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name cannot exceed {#limit} characters',
        'any.required': 'Name is required',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(8).max(1000).required().messages({
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password cannot exceed {#limit} characters',
        'any.required': 'Password is required',
    }),
});

export default signUpSchema;