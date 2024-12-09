import bcrypt from "bcrypt";
import { config } from "dotenv";
config({ path: "./config/.env" });
import { User } from "../models/users.model.js";
import { transporter } from "../middlewares/nodemailer.middleware.js";
import { generateTokens, generateResetToken } from "../middlewares/tokens.middleware.js";
import { validateProfile } from "../middlewares/validations.middleware.js";

/**
 * Register user
 * @function registerUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} fullName - Full name of the user
 * @body {String} username - Username of the user
 * @body {String} email - Email of the user
 * @body {String} password - Password of the user
 * @returns {String} - Message
 * @method POST
 * @example http://localhost:3001/register
 */
export const registerUser = async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email }, { email: 1 });
    if (emailExists) {
      return res.status(400).json({ error: "There is a registered user with this email" });
    }
    const usernameExists = await User.findOne({ username: req.body.username }, { username: 1 });
    if (usernameExists) {
      return res.status(400).json({ error: "Username already exists" });
    }
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));
    }
    delete req.body.confirmPassword;
    const user = new User(req.body);
    await user.save();
    res.status(201).json("User registered");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Login user
 * @function loginUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} email - Email of the user
 * @body {String} password - Password of the user
 * @returns {String} - Message
 * @method POST
 * @example http://localhost:3001/login
 */
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }, { id: 1, username: 1, password: 1, role: 1, status: 1, deleted: 1 });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (user.status === "blocked" || user.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    generateTokens(user, res);
    res.status(200).json("User logged in");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Logout user
 * @function logoutUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {String} - Message
 * @method POST
 * @example http://localhost:3001/:username
 */
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json("User logged out");
}

/**
 * Forgot password
 * @function forgotPassword
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {String} - Message
 * @method POST
 * @example http://localhost:3001/forgot-password
 */
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }, { email: 1 });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const resetToken = generateResetToken(user);
    const resetLink = `http://localhost:${process.env.PORT}/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password Request",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json("Reset link sent to email");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Reset password
 * @function resetPassword
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} password - Password of the user
 * @returns {String} - Message
 * @method PATCH
 * @example http://localhost:3001/reset-password/:resetToken
 */
export const resetPassword = async (req, res) => {
  try {
    const decoded = jwt.verify(req.paramstoken, process.env.JWT_RESET_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    user.password = hashedPassword;
    await user.save();
    res.status(200).json("Password reset successfully");
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).json({ error: "Reset token has expired" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

/**
 * View my account
 * @function viewAccount
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - User account data
 * @method GET
 * @example http://localhost:3001/account/:username
 */
export const viewAccount = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { fullName: 1, username: 1, email: 1, role: 1, status: 1, deleted: 1 });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.status === "blocked" || user.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    res.status(200).json(user);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Edit password
 * @function editPassword
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} password - Password of the user
 * @returns {String} - Message
 * @method PATCH
 * @example http://localhost:3001/account/edit-password/:username
 */
export const editPassword = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { _id: 1 });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));
    }
    delete req.body.confirmPassword;
    await User.findByIdAndUpdate(user._id, req.body);
    res.status(200).json("Password updated");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * View my profile
 * @function viewProfile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - User profile data
 * @method GET
 * @example http://localhost:3001/profile/:username
 */
export const viewMyProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { status: 1, deleted: 1, fullName: 1, username: 1, profilePicture: 1, bio: 1, interests: 1, followers: 1, following: 1, inspirations: 1, subscription: 1 });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.status === "blocked" || user.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Edit my profile
 * @function editProfile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @body {String} fullName - Full name of the user
 * @body {String} username - Username of the user
 * @body {String} profilePicture - Profile picture of the user
 * @body {String} bio - Bio of the user
 * @body {Array} interests - Interests of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/profile/edit/:username
 */
export const editProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { _id: 1, status: 1, deleted: 1 });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.status === "blocked" || user.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    const { error } = validateProfile(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    if (req.file) {
      req.body.profilePicture = req.file.path;
    }
    await User.findByIdAndUpdate(user._id, req.body);
    res.status(200).json("User updated");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Share profile
 * @function shareProfile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @returns {String} - Link to the profile
 * @method GET
 * @example http://localhost:3001/:username
 */
export const shareProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { username: 1, status: 1, deleted: 1 });
    if (user.status === "blocked" || user.deleted) return res.status(403).json({ error: "User is blocked or has been deleted" });
    res.status(200).json(`http://localhost:3001/users/${user.username}`);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}