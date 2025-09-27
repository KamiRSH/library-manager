const Joi = require("joi")
exports.username = Joi.string().alphanum().min(3).max(30).required()
exports.status =  Joi.string().valid('pendingForPayment', 'inProgress', 'paid',"").optional();
exports.schema = Joi.object().optional(); 
exports.books = Joi.object().pattern(
    Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),  
    Joi.number().required() 
);