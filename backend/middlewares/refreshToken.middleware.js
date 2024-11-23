import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "./config/.env" });
import cookie from "cookie-parser";

export const refreshToken = (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(401);
    const refreshToken = cookies.token;
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); // Forbidden
      const user = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role
      };
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000 // 1 hr
      });
      res.locals.token = token;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Error refreshing token" });
  }
};