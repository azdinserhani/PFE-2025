import Joi from "joi";

const createLessonSchema = Joi.object({
  module_id: Joi.number().required().messages({
    "number.base": "Module ID must be a number",
    "any.required": "Module ID is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Lesson name is required",
    "any.required": "Lesson name is required",
  }),
  number: Joi.number().integer().min(1).required().messages({
    "number.base": "Lesson number must be a number",
    "number.integer": "Lesson number must be an integer",
    "number.min": "Lesson number must be at least 1",
    "any.required": "Lesson number is required",
  }),
  video_url: Joi.required().messages({
    "string.empty": "Video URL is required",
    "any.required": "Video URL is required",
  }),
  lessons_details: Joi.string().optional().allow("").messages({
    "string.base": "Lesson details must be a string",
  }),
  is_free: Joi.boolean().required().messages({
    "boolean.base": "Is Free must be a boolean value",
    "any.required": "Is Free is required",
  }),
  duration_seconds: Joi.number().optional().messages({
    "number.base": "Duration must be a number",
  }),
});

const updateLessonSchema = Joi.object({
  module_id: Joi.number().optional().messages({
    "number.base": "Module ID must be a number",
  }),
  name: Joi.string().optional().messages({
    "string.empty": "Lesson name cannot be empty",
  }),
  number: Joi.number().integer().min(1).optional().messages({
    "number.base": "Lesson number must be a number",
    "number.integer": "Lesson number must be an integer",
    "number.min": "Lesson number must be at least 1",
  }),
  video_url: Joi.string().uri().optional().messages({
    "string.uri": "Video URL must be a valid URI",
  }),
  lessons_details: Joi.string().optional().allow("").messages({
    "string.base": "Lesson details must be a string",
  }),
  is_free: Joi.boolean().optional().messages({
    "boolean.base": "Is Free must be a boolean value",
  }),
});

export { createLessonSchema, updateLessonSchema };
