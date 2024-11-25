import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "./config/.env" });
import cookie from "cookie-parser";

export const generateAccessToken = (user) => {
  try {
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    // Config cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  } catch (error) {
    res.status(500).json({ error: "Error generating token" });
  }
};

export const generateRefreshToken = (user) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(401);
    const refreshToken = cookies.token;
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const payload = {
        id: user._id,
        username: user.username,
        role: user.role
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5d" });
      // Config cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    })
  } catch (error) {
    res.status(500).json({ error: "Error refreshing token" });
  }
};

export const generateResetToken = (user) => {
  try {
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    return resetToken;
  } catch (error) {
    res.status(500).json({ error: "Error generating token" });
  }
};