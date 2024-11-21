import { User } from "../models/users.model.js";

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
    const user = await User.find({ username: req.params.username, deleted: false, status: "active" });
    user ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: "Invalid user id" })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Search user by full name, username, bio, or any of interests
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
        deleted: false, status: "active"
      },
      { page, limit });
    user.docs.length > 0 ? res.status(200).json(user) : res.status(404).json({ error: "User not found" });
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Create user
 * @function createUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} fullName - Full name of the user
 * @body {String} email - Email of the user
 * @body {String} password - Password of the user
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/users
 */
export const createUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).json({ error: "User already exists" });
    const user = new User(req.body);
    await user.save();
    res.status(201).json("User created");
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
    if (req.body.fullName) updatedUser.fullName = req.body.fullName;
    if (req.body.username) updatedUser.username = req.body.username;
    if (req.body.password) updatedUser.password = req.body.password;
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