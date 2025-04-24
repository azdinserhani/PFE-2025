import Joi from 'joi';

// Registration validation schema
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Username must be a text',
      'string.alphanum': 'Username must only contain alphanumeric characters',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 20 characters',
      'any.required': 'Username is required'
    }),
    
  email: Joi.string()
    .email()
    .max(20)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.max': 'Email cannot exceed 20 characters',
      'any.required': 'Email is required'
    }),
    
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'Password is required'
    }),
    
  role: Joi.string()
    .valid('student', 'teacher')
    .required()
    .messages({
      'any.only': 'Role must be either student or teacher',
      'any.required': 'Role is required'
    }),
    
  profile_pic: Joi.string().required().messages({
    'any.required': 'Profile picture is required'
  })
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

export { registerSchema, loginSchema }; 