const Joi = require("joi")

exports.uuid = Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required();
exports.createSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(), 
    author: Joi.string().min(3).max(100).required(),  
    publicationYear: Joi.number().integer().min(1000).max(2024).required(),  
    price: Joi.number().positive().precision(2).required(), 
    bookSummary: Joi.string().optional().allow(''),  
    quantity: Joi.number().integer().min(0).required(), 
    tags: Joi.array().items(Joi.string().min(1)).optional() 
});
exports.searchSchema =Joi.object({
    title: Joi.string().min(3).max(30).optional(),
    author: Joi.string().min(3).max(30).optional(),  
    tag: Joi.string().optional()
})
exports.updateSchema = Joi.object({
    title: Joi.string().min(3).max(100), 
    author: Joi.string().min(3).max(100),  
    publicationYear: Joi.number().integer().min(1000).max(2024),  
    price: Joi.number().positive().precision(2), 
    bookSummary: Joi.string().optional().allow(''),  
    quantity: Joi.number().integer().min(0), 
}).or("title", "author", "publicationYear", "price", "bookSummary", "quantity");

exports.tagsSchema = Joi.object({
    tagsUpdateData: Joi.object({
        add: Joi.array().items(Joi.string().min(1)).required(), 
        remove: Joi.array().items(Joi.string().min(1)).required()
    }).required()
});
exports.status = Joi.string().valid('reject', 'report', 'pending', 'accepted').required();