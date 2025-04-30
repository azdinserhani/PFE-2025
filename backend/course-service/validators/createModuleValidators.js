import Joi from "joi";

const createModuleSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Module name is required",
    "any.required": "Module name is required",
  }),
  course_id: Joi.number().required().messages({
    "string.empty": "Course ID is required",
    "any.required": "Course ID is required",
  }),
  number: Joi.number().integer().min(1).required().messages({
    "number.base": "Module number must be a number",
    "number.integer": "Module number must be an integer",
    "number.min": "Module number must be at least 1",
    "any.required": "Module number is required",
  }),
});

const updateModuleSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Module name cannot be empty",
  }),
  number: Joi.number().integer().min(1).optional().messages({
    "number.base": "Module number must be a number",
    "number.integer": "Module number must be an integer",
    "number.min": "Module number must be at least 1",
  }),
});
export { createModuleSchema, updateModuleSchema };
