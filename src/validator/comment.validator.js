const joi = require("joi");

exports.CommentSchema = joi.object({
  content: joi.string().min(5).max(50).required(),
});
