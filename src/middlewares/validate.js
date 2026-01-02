const AppError = require("../utils/appError");

module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) return next(new AppError(400, error.message));

  req.body = value;
  next();
};
