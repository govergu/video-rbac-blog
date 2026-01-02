const joi = require("joi");

exports.BlogSchema = joi.object({
  title: joi.string().max(50).required(),
  content: joi.string().max(300).required(),
});
