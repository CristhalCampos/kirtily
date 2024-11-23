import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "./config/.env" });
import cookie from "cookie-parser";

export const authenticateToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(401);
  const refreshToken = cookies.token;
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  })
};