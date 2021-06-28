const Joi = require('joi');
const joiValidator = require('express-joi-validation');
const { GroupPermissions } = require('../types/index')

const userUpdateSchema = Joi.object({
    id: Joi.string().guid().required(),
    login: Joi.string().min(3).required(),
    password: Joi.string().required().pattern(new RegExp('[a-z]')).pattern(new RegExp('[0-9]')),
    age: Joi.number().min(4).max(130).required()
});

const userCreateSchema = Joi.object({
    login: Joi.string().min(3).required(),
    password: Joi.string().required().pattern(new RegExp('[a-z]')).pattern(new RegExp('[0-9]')),
    age: Joi.number().min(4).max(130).required()
});

const userSearchSchema = Joi.object({
    starts_with: Joi.string(),
    limits: Joi.number()
});

const userIdSchema = Joi.object({
    id: Joi.string().guid().required()
});

const groupGetSchema = Joi.object({
    id: Joi.string().guid()
});

const groupDeleteSchema = Joi.object({
    id: Joi.string().guid().required()
});

const groupCreateSchema = Joi.object({
    name: Joi.string(),
    permissions: Joi.array().items(Joi.string().guid().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
});

const groupUpdateSchema = Joi.object({
    id: Joi.string().guid().required(),
    name: Joi.string(),
    permissions: Joi.array().items(Joi.string().guid().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
});

const validator = joiValidator.createValidator({passError: true});

module.exports = {
    userUpdateSchema,
    userCreateSchema,
    userSearchSchema,
    userIdSchema,
    groupGetSchema,
    groupDeleteSchema,
    groupCreateSchema,
    groupUpdateSchema,
    validator
};