import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({ path: "./config/.env" });
import cookie from "cookie-parser";


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
    const hashedPassword = await bcrypt.hash(req.body.password, process.env.SALT_ROUNDS);
    req.body.password = hashedPassword;
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
    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.status(200).json("User logged in");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Get user by username
 * @function getUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - User username
 * @returns {Object} - User
 * @method GET
 * @example http://localhost:3001/users/username
 */
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username, deleted: false, status: "active" },
      { fullName: 1, username: 1, profilePicture: 1, bio: 1, interests: 1, followers: 1, following: 1, subscription: 1 }
    );
    user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: "Invalid user id" })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Search user by full name, username, bio or any of interests
 * @function searchUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {String} search - Search term
 * @query {Number} page - Page number
 * query {Number} limit - Limit of users
 * @returns {Object} - List of users
 * @method GET
 * @example http://localhost:3001/search?search=user&page=1&limit=10
 */
export const searchUser = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    if (!search) return res.status(400).json({ error: "Search term is required" });
    const user = await User.paginate(
      { $or: [
          { fullName: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
          { bio: { $regex: search, $options: "i" } },
          { interests: { $elemMatch: { $regex: search, $options: "i" } } }
        ],
        deleted: false,
        status: "active"
      },
      { username: 1, profilePicture: 1, interests: 1 },
      { page, limit }
    );
    user.docs.length > 0 ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
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
    if (userExists.status !== "active" || userExists.deleted) {
      return res.status(403).json({ error: "User is not active or has been deleted" });
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