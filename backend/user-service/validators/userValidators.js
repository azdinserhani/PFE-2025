import Joi from "joi";

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a text",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 30 characters",
    "any.required": "Username is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a text",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),

  profile_pic: Joi.string().uri().optional().messages({
    "string.uri": "Profile picture must be a valid URI",
  }),

  role: Joi.string().valid('admin', 'instructor', 'student').required().messages({
    "any.only": "Role must be either 'admin', 'instructor', or 'student'",
    "any.required": "Role is required",
  }),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).messages({
    "string.base": "Username must be a text",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 30 characters",
  }),

  email: Joi.string().email().messages({
    "string.email": "Please provide a valid email address",
  }),

  profile_pic: Joi.string().uri().optional().messages({
    "string.uri": "Profile picture must be a valid URI",
  }),

  role: Joi.string().valid('admin', 'instructor', 'student').messages({
    "any.only": "Role must be either 'admin', 'instructor', or 'student'",
  }),
});

export { createUserSchema, updateUserSchema };