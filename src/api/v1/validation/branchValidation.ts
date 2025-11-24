import Joi from "joi";

export const createBranchSchema = Joi.object({
  name: Joi.string().min(2).required(),
  address: Joi.string().required(),
  phone: Joi.string().min(7).required()
});

export const updateBranchSchema = Joi.object({
  name: Joi.string().min(2),
  address: Joi.string(),
  phone: Joi.string().min(7)
}).min(1);
