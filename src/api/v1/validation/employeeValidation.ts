import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required(),
  branchId: Joi.number().integer().required()
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(2),
  position: Joi.string(),
  department: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().min(7),
  branchId: Joi.number().integer()
}).min(1); // UPDATE must include at least one field
