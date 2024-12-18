import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "./config/.env" });

/**
 * @description Generate and set access and refresh tokens in cookies
 * @param {Object} user - User object containing user details
 * @param {Object} res - Response object
 */
export const generateTokens = (user, res) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Set cookies for tokens
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { accessToken, refreshToken };
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not provided" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ accessToken: newAccessToken });
  });
};

/**
 * @description Generate a reset password token
 * @param {Object} user - User object containing user details
 * @returns {String} - Reset password token
 */
export const generateResetToken = (user) => {
  const resetToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_RESET_SECRET,
    { expiresIn: "1h" } // Token expires in 1 hour
  );
  return resetToken;
};