import { User } from "../models/users.model.js";
import { registerValidation } from "../middlewares/registerValidation.middleware.js";
import { encryptPassword } from "../middlewares/encryptPassword.middleware.js";
import { generateToken } from "../middlewares/generateToken.middleware.js";

/**
 * Register user
 * @function registerUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/users
 */
export const registerUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).json({ error: "User already exists" });
    await registerValidation(req, res);
    await encryptPassword(req, res);
    await User.create(req.body);
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
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/users
 */
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });
    await generateToken(user);
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
 * @example http://localhost:3001/users
 */
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json("User logged out");
}

/**
 * Edit user profile or user account
 * @function editUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @body {String} fullName - Full name of the user
 * @body {String} username - Username of the user
 * @body {String} password - Password of the user
 * @body {String} profilePicture - Profile picture of the user
 * @body {String} bio - Bio of the user
 * @body {Array} interests - Interests of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/users/:username
 */
export const editUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.params.username });
    if (!userExists) return res.status(404).json({ error: "User not found" });
    if (userExists.status === "blocked" || userExists.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    const updatedUser = {};
    if (req.body.password) updatedUser.password = await bcrypt.hash(req.body.password, process.env.SALT_ROUNDS);
    if (req.body.fullName) updatedUser.fullName = req.body.fullName;
    if (req.body.username) updatedUser.username = req.body.username;
    if (req.body.profilePicture) updatedUser.profilePicture = req.body.profilePicture;
    if (req.body.bio) updatedUser.bio = req.body.bio;
    if (req.body.interests) updatedUser.interests = req.body.interests;
    await User.findOneAndUpdate(
      { username: req.params.username },
      { $set: updatedUser }
    );
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
 * @example http://localhost:3001/users/:username
 */
export const shareProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { username: 1, status: 1, deleted: 1 });
    if (user.status === "blocked" || user.deleted) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    res.status(200).json(`http://localhost:3001/users/${user.username}`);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}