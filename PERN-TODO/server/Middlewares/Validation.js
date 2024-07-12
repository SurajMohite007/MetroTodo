const httpStatus = require('http-status'); 

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });

  }
  req.validatedBody = value; 
  return next();
};

module.exports = validate;
