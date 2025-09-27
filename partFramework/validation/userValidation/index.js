const Joi = require("joi")

exports.signUp = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(), 
    phone: Joi.string().pattern(/^09[0-9]{9}$/), 
    password: Joi.string().min(8).required(),
    repeatedPassword: Joi.string().valid(Joi.ref('password')).required() 
  });

exports.signIn = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).required()
});

exports.updateUser = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^09[0-9]{9}$/), 
  password: Joi.string().min(8) 
});

exports.username = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required()
});

exports.role = Joi.object({
  role: Joi.string().alphanum().min(3).max(30).required()
});

exports.activate = Joi.object({
  activate: Joi.boolean().required()
});