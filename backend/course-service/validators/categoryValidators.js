import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "Category name must be a text",
    "string.min": "Category name must be at least 2 characters long",
    "string.max": "Category name cannot exceed 50 characters",
    "any.required": "Category name is required",
  }),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    "string.base": "Category name must be a text",
    "string.min": "Category name must be at least 2 characters long",
    "string.max": "Category name cannot exceed 50 characters",
  }),
});

export { categorySchema, updateCategorySchema }; 