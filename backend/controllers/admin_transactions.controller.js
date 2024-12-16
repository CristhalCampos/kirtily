import e from "express";
import { Transaction } from "../models/transactions.model.js";

/**
 * @description Get all transactions
 * @function getAllTransactions
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of transactions
 * @returns {Object} - List of transactions
 * @method GET
 * @example http://localhost:3001/admin/transactions?page=1&limit=10
 */
export const getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const transactions = await Transaction.paginate({ deleted: false }, { page, limit });
    res.json(transactions);
  } catch (error) {
    error === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};