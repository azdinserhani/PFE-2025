import Joi from "joi";

const courseSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.base": "Title must be a text",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 100 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string().min(10).max(500).required().messages({
    "string.base": "Description must be a text",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 500 characters",
    "any.required": "Description is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  categoryId: Joi.number().required().messages({
    "any.required": "Category ID is required",
  }),

  thumbnail: Joi.string().required().messages({
    "string.uri": "Thumbnail must be a valid URI",
    "any.required": "Thumbnail is required",
  }),
});

const updateCourseSchema = Joi.object({
  title: Joi.string().min(3).max(100).messages({
    "string.base": "Title must be a text",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 100 characters",
  }),

  description: Joi.string().min(10).max(500).messages({
    "string.base": "Description must be a text",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 500 characters",
  }),

  price: Joi.number().min(0).messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
  }),

  categoryId: Joi.number().messages({
    "any.required": "Category ID is required",
  }),

  thumbnail: Joi.string().messages({
    "string.uri": "Thumbnail must be a valid URI",
  }),
});
export { courseSchema, updateCourseSchema };
