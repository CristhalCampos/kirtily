import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config({ path: "./config/.env" });

export const encryptPassword = async (req, res, next) => {
  try {
    saltRounds = parseInt(process.env.SALT_ROUNDS);
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    // Delete confirmPassword from body
    delete req.body.confirmPassword;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error encrypting password" });
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    return false;
  }
};