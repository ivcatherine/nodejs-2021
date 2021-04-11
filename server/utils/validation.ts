const Joi = require('joi')
 
export const userSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().min(3).required(),
    password: Joi.string().required(),
    age: Joi.number().min(4).max(130).required()
})

export const userIdSchema = Joi.object({
    id: Joi.string().required()
})

export const userSearchSchema = Joi.object({
    starts_with: Joi.string(),
    limits: Joi.number()
})
