const Joi = require('joi');
 
const userUpdateSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().min(3).required(),
    password: Joi.string().required().pattern(new RegExp('[a-z]')).pattern(new RegExp('[0-9]')),
    age: Joi.number().min(4).max(130).required()
});

const userCreateSchema = Joi.object({
    login: Joi.string().min(3).required(),
    password: Joi.string().required().pattern(new RegExp('[a-z]')).pattern(new RegExp('[0-9]')),
    age: Joi.number().min(4).max(130).required()
});

const userIdSchema = Joi.object({
    id: Joi.string().required()
});

const userSearchSchema = Joi.object({
    starts_with: Joi.string(),
    limits: Joi.number()
});

module.exports = {
    userUpdateSchema,
    userCreateSchema,
    userIdSchema,
    userSearchSchema,
};