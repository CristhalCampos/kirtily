import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config({ path: "./config/.env" });

/**
 * @description Get all users
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
 * @description Create user
 * @function createUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} fullName - Full name of the user
 * @body {String} username - Username of the user
 * @body {String} email - Email of the user
 * @body {String} password - Password of the user
 * @body {String} confirmPassword - Confirm password of the user
 * @body {String} role - Role of the user
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/admin/users/create
 */
export const createUser = async (req, res) => {
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
    res.status(201).json("User created");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * @description Edit user
 * @function editUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.fullName - Full name of the user
 * @param {String} req.body.username - Username of the user
 * @param {String} req.body.email - Email of the user
 * @param {String} req.body.role - Role of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/admin/users/edit
 */
export const editUser = async (req, res) => {
  try {
    const userExists = await User.findOne(
      { $or: [{ username: req.body.email }, { email: req.body.email }] },
      { _id: 1, status: 1, deleted: 1 }
    );
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.findByIdAndUpdate(userExists._id, req.body);
    res.status(200).json("User edited");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * @description Block or unblock user
 * @function blockUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.username - Username of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/admin/users
 */
export const blockOrUnblockUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.body.username }, {_id: 1, status: 1, deleted: 1 });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    if (userExists.deleted) {
      return res.status(403).json({ error: "User has been deleted" });
    }
    if (userExists.status === "blocked") {
      await User.findByIdAndUpdate( userExists._id, { status: "active" } );
      res.status(200).json("User unblocked");
    } else if (userExists.status === "active" || userExists.status === "reported") {
      await User.findByIdAndUpdate( userExists._id, { status: "blocked" } );
      res.status(200).json("User blocked");
    }
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * @description Delete user
 * @function deleteUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.username - Username of the user
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/admin/users
 */
export const deleteUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.body.username }, { _id: 1, status: 1, deleted: 1 });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }
    if (userExists.deleted) {
      return res.status(403).json({ error: "User has been deleted" });
    }
    await User.findByIdAndUpdate( userExists._id, { deleted: true } )
    res.status(200).json("User deleted");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}