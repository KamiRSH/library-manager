const Joi = require("joi")

exports.uuid = Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required();
exports.newComment = Joi.object({
    content: Joi.string().min(3).max(50).required()
  }).unknown(true);
exports.username =  Joi.string().alphanum().min(3).max(30).required()
exports.status =  Joi.string().valid('reject', 'report', 'pending', 'published').required();