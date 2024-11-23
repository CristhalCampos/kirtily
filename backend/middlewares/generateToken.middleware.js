import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "./config/.env" });
import cookie from "cookie-parser";

export const generateToken = (user) => {
  try {
    const payload = {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    // Config cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hr
    });
    res.locals.token = token;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error generating token" });
  }
};