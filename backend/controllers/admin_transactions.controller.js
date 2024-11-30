import { Transaction } from "../models/transactions.model.js";

/**
 * Get all transactions
 * @function getAllTransactions
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of transactions
 * @method GET
 * @example http://localhost:3001/admin/transactions
 */
export const getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const transactions = await Transaction.paginate({ deleted: false }, { page, limit });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
};