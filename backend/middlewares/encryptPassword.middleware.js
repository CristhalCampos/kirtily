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

export default { encryptPassword, comparePassword };