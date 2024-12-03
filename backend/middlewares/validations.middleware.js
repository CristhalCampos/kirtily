import Joi from "joi";

const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).max(15).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
  }),
});

const editPasswordSchema = Joi.object({
  password: Joi.string().min(8).max(15).required(),
  newPassword: Joi.string().min(8).max(15).required(),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Passwords must match",
  }),
});

export const registerValidation = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const forgotValidation = (req, res, next) => {
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const resetValidation = (req, res, next) => {
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const editValidation = (req, res, next) => {
  const { error } = editPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateProfile = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    bio: Joi.string().max(255).optional(),
    interests: Joi.array().items(Joi.string().max(20)).optional(),
  });
  return schema.validate(data);
};

export const validatePublication = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(200).required(),
    hashtags: Joi.array().items(Joi.string().max(20)).optional(),
  });
  return schema.validate(data);
};