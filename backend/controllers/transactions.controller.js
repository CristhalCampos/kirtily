import { Transaction } from "../models/transactions.model.js";

export const getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving transaction history" });
  }
}