const joi = require("joi");

exports.registerSchema = joi.object({
  username: joi.string().min(5).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

exports.loginSchema = joi.object({
  username: joi.string().min(5).max(20).required(),
  password: joi.string().min(8).required(),
});
