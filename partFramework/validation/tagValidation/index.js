const Joi = require("joi")

exports.uuid = Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required();
exports.tagSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(), 
    id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).optional(),    
    status: Joi.string().valid('reject', 'report', 'pending', 'published').optional() 
});
exports.searchSchema =Joi.object({
    name: Joi.string().min(3).max(30).optional(),  
    id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).optional(),
    status: Joi.string().valid('reject', 'report', 'pending', 'published').optional()
}).optional()

exports.updateSchema =Joi.object({
    name: Joi.string().min(3).max(30),
    status: Joi.string().valid('reject', 'report', 'pending', 'published')
}).or('name','status');
exports.status = Joi.string().valid('reject', 'report', 'pending', 'accepted').required();