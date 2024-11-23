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
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};