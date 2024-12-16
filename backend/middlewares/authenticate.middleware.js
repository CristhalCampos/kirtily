import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "./config/.env" });

/**
 * @description Middleware to authenticate a user
 * @param {Array} roles - Array of roles that the user must have
 * @returns {Function} - Middleware function
 */
export const authorizeRole = (roles) => (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};