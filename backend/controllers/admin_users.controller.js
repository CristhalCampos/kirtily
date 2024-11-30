import { User } from "../models/users.model.js";

/**
 * Get all users
 * @function getAllUsers
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of users
 * @returns {Object} - List of users
 * @method GET
 * @example http://localhost:3001/admin/users?page=1&limit=10
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.paginate(
      { deleted: false },
      { username: 1, email: 1, role: 1, status: 1, createdAt: 1, updatedAt: 1 },
      { page, limit }
    );
    res.status(200).json(users);
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
 * @body {String} username - Username of the user
 * body {String} email - Email of the user
 * @body {String} password - Password of the user
 * @body {String} confirmPassword - Confirm password of the user
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/admin/users
 */
export const createUser = async (req, res) => {
  try {
    //Validar datos y encriptar contraseña
    await User.create(req.body);
    res.status(201).json("User created");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Edit user
 * @function editUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/admin/users/:username
 */
export const editUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.params.username }, {username: 1, status: 1, deleted: 1 });
    if (!userExists) return res.status(404).json({ error: "User not found" });
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
 * Block or unblock user
 * @function blockUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/admin/users/:username
 */
export const blockOrUnblockUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.params.username }, {username: 1, status: 1, deleted: 1 });
    if (!userExists) return res.status(404).json({ error: "User not found" });
    if (userExists.deleted) {
      return res.status(403).json({ error: "User has been deleted" });
    }
    if (userExists.status === "blocked") {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { status: "active" }
      );
      res.status(200).json("User unblocked");
    } else if (userExists.status === "active" || userExists.status === "reported") {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { status: "blocked" }
      );
      res.status(200).json("User blocked");
    }
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Delete user
 * @function deleteUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/admin/users/:username
 */
export const deleteUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.params.username }, {username: 1, status: 1, deleted: 1 });
    if (!userExists) return res.status(404).json({ error: "User not found" });
    if (userExists.deleted) return res.status(403).json({ error: "User has been deleted" });
    await User.findOneAndUpdate(
      { username: req.params.username },
      { deleted: true }
    );
    res.status(200).json("User deleted");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}