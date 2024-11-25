import { User, User } from "../models/users.model.js";
import { transporter } from "../middlewares/nodemailer.middleware.js";
import { registerValidation, loginValidation, passwordValidation } from "../middlewares/validation.middleware.js";
import { encryptPassword, comparePassword } from "../middlewares/bcrypt.middleware.js";
import { generateAccessToken, generateResetToken } from "../middlewares/token.middleware.js";


/**
 * Register user
 * @function registerUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} fullName - Full name of the user
 * @body {String} username - Username of the user
 * @body {String} email - Email of the user
 * @body {String} password - Password of the user
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/register
 */
export const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).json({ error: "User already exists" });
    await registerValidation(req, res);
    const hashedPassword = await encryptPassword(req, res);
    req.body.password = hashedPassword;
    await User.insert({fullName: req.body.fullName, username: req.body.username, email: req.body.email, password: req.body.password});
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
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/login
 */
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.status === "blocked" || user.deleted) return res.status(403).json({ error: "User is blocked or has been deleted" });
    await loginValidation(req, res);
    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });
    generateAccessToken(user);
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
 * @returns {Object} - Message
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
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/forgot-password
 */
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const resetToken = await generateResetToken(user);
    const resetLink = `http://localhost:3001/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset password",
      html: `<p>Hello,</p>
             <p>You requested to reset your password. Please click the link below to reset it:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link will expire soon.</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json("Reset link sent to email");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Reset password
 * @function resetPassword
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} password - Password of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/reset-password/:resetToken
 */
export const resetPassword = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }, { _id: 1 });
    if (!user) return res.status(404).json({ error: "User not found" });
    await passwordValidation(req, res);
    hashedPassword = await encryptPassword(req, res);
    await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    res.status(200).json("Password reset");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Edit password
 * @function editPassword
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} password - Password of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/:username
 */
export const editPassword = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { _id: 1 });
    if (!user) return res.status(404).json({ error: "User not found" });
    await passwordValidation(req, res);
    hashedPassword = await encryptPassword(req, res);
    user.password = hashedPassword;
    await User.updateOne({ _id: user._id }, { $set: { password: user.password } });
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
 * @returns {Object} - Message
 * @method GET
 * @example http://localhost:3001/profile/:username
 */
export const viewMyProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { status: 1, deleted: 1, fullName: 1, username: 1, profilePicture: 1, bio: 1, interests: 1, followers: 1, following: 1, inspirations: 1, subscription: 1 });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.status === "blocked" || user.deleted) return res.status(403).json({ error: "User is blocked or has been deleted" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Edit user profile
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
 * @example http://localhost:3001/profile/edit
 */
export const editProfile = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.params.username }, { username: 1, status: 1, deleted: 1 });
    if (!userExists) return res.status(404).json({ error: "User not found" });
    if (userExists.status === "blocked" || userExists.deleted) return res.status(403).json({ error: "User is blocked or has been deleted" });
    //Hacer validación de los datos
    await User.findOneAndUpdate({ username: req.params.username }, { $set: req.body });
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
 * param {String} req.params.username - Username of the user
 * @returns {Object} - Message
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