import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

  phone: Joi.string().required(),

  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),

  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  phone: Joi.string(),
}).min(1).messages({
  'object.min': 'Body must have at least one field',
});

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean(),
}).min(1).messages({
  'object.min': 'Body must have at least one field',
});