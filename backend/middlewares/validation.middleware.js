import joi from "joi";

export const registerValidation = (req, res, next) => {
  const schema = joi.object({
    fullName: joi.string().min(3).max(30).required(),
    username: joi.string().alphanum().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required(),
    confirmPassword: joi.any().valid(joi.ref("password")).required().messages({
      "any.only": "Confirm password must match password",
    }),
  });
  const data = {
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };
  const { error } = schema.validate(data);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required(),
  });
  const data = { email: req.body.email, password: req.body.password };
  const { error } = schema.validate(data);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const passwordValidation = (req, res, next) => {
  const schema = joi.object({
    password: joi.string().min(8).max(15).required(),
    confirmPassword: joi.any().valid(joi.ref("password")).required().messages({
      "any.only": "Confirm password must match password",
    }),
  });
  const data = { password: req.body.password, confirmPassword: req.body.confirmPassword };
  const { error } = schema.validate(data);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};