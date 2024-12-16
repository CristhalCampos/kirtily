import Joi from "joi";

/**
 * @description Validate user registration
 * @function registerValidation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Function} - Next middleware function
 */
export const registerValidation = (req, res, next) => {
  const registerSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords must match",
    }),
  });
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

/**
 * @description Validate user creation
 * @function createUserValidation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Function} - Next middleware function
 */
export const createUserValidation = (req, res, next) => {
  const createUserSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords must match",
    }),
    role: Joi.string().valid("admin", "user", "userpremium").default("user"),
  });
  const { error } = createUserSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

/**
 * @description Validate user edit
 * @function editUserValidation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Function} - Next middleware function
 */
export const editUserValidation = (req, res, next) => {
  const editUserSchema = Joi.object({
    fullName: Joi.string().min(3).max(50).optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid("admin", "user", "userpremium").optional(),
  });
  const { error } = editUserSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

/**
 * @description Validate user login
 * @function loginValidation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Function} - Next middleware function
 */
export const loginValidation = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

/**
 * @description Validate user forgot password
 * @function forgotValidation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Function} - Next middleware function
 */
export const forgotValidation = (req, res, next) => {
  const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = forgotPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

/**
 * @description Validate user reset password
 * @function resetValidation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Function} - Next middleware function
 */
export const resetValidation = (req, res, next) => {
  const resetPasswordSchema = Joi.object({
    password: Joi.string().min(8).max(15).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords must match",
    }),
  });
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

/**
 * @description Validate user edit password
 * @function editValidation
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 * @returns {Function} - Next middleware function
 */
export const editValidation = (req, res, next) => {
  const editPasswordSchema = Joi.object({
    password: Joi.string().min(8).max(15).required(),
    newPassword: Joi.string().min(8).max(15).required(),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().messages({
      "any.only": "Passwords must match",
    }),
  });
  const { error } = editPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

/**
 * @description Validate user profile
 * @function validateProfile
 * @param {Object} data - Request object
 * @returns {Function} - Next middleware function
 */
export const validateProfile = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    bio: Joi.string().max(255).optional(),
    interests: Joi.array().items(Joi.string().max(20)).optional(),
  });
  return schema.validate(data);
};

/**
 * @description Validate publication
 * @function validatePublication
 * @param {Object} data - Request object
 * @returns {Function} - Next middleware function
 */
export const validatePublication = (data) => {
  const schema = Joi.object({
    content: Joi.string().min(3).max(200).required(),
    hashtags: Joi.array().items(Joi.string().max(20)).optional(),
  });
  return schema.validate(data);
};