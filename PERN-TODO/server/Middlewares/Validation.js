const httpStatus = require('http-status'); 

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    // Return a standard HTTP status code and error message
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });
    // Alternatively, you can handle errors in a different way as per your application's requirements
  }
  req.validatedBody = value; // Attach validated data to request object
  return next();
};

module.exports = validate;
