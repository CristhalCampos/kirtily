import { User } from "../models/users.model.js";
import { Publication } from "../models/publications.model.js";
import { Comment } from "../models/comments.model.js";
import { Transaction } from "../models/transactions.model.js";

/**
 * @description Get the number of users: active, blocked, reported, deleted and total
 * @function usersStatistics
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Number of users
 * @method GET
 * @route /http://localhost:3001/admin
 */
export const usersStatistics = async (req, res) => {
  try {
    const activeUsers = await User.countDocuments({ status: "active" });
    const blockedUsers = await User.countDocuments({ status: "blocked" });
    const reportedUsers = await User.countDocuments({ status: "reported" });
    const deletedUsers = await User.countDocuments({ deleted: true });
    const totalUsers = await User.countDocuments();
    res.json({ activeUsers, blockedUsers, reportedUsers, deletedUsers, totalUsers });
  } catch (error) {
    error === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description Get the number of publications: active, reported, deleted and total
 * @function publicationsStatistics
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Number of publications
 * @method GET
 * @route /http://localhost:3001/admin
 */
export const publicationsStatistics = async (req, res) => {
  try {
    const activePublications = await Publication.countDocuments({ status: "active" });
    const reportedPublications = await Publication.countDocuments({ status: "reported" });
    const deletedPublications = await Publication.countDocuments({ deleted: true });
    const totalPublications = await Publication.countDocuments();
    res.json({ activePublications, reportedPublications, deletedPublications, totalPublications });
  } catch (error) {
    error === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description Get the number of comments: active, reported, deleted and total
 * @function commentsStatistics
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Number of comments
 * @method GET
 * @route /http://localhost:3001/admin
 */
export const commentsStatistics = async (req, res) => {
  try {
    const activeComments = await Comment.countDocuments({ status: "active" });
    const reportedComments = await Comment.countDocuments({ status: "reported" });
    const deletedComments = await Comment.countDocuments({ deleted: true });
    const totalComments = await Comment.countDocuments();
    res.json({ activeComments, reportedComments, deletedComments, totalComments });
  } catch (error) {
    error === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description Get the number of transactions: pending, completed, failed and total
 * @function transactionsStatistics
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Number of transactions
 * @method GET
 * @route /http://localhost:3001/admin
 */
export const transactionsStatistics = async (req, res) => {
  try {
    const pendingTransactions = await Transaction.countDocuments({ status: "pending" });
    const completedTransactions = await Transaction.countDocuments({ status: "completed" });
    const failedTransactions = await Transaction.countDocuments({ status: "failed" });
    const totalTransactions = await Transaction.countDocuments();
    res.json({ pendingTransactions, completedTransactions, failedTransactions, totalTransactions });
  } catch (error) {
    error === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};