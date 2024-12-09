import { Router} from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { usersStatistics, publicationsStatistics, transactionsStatistics, commentsStatistics } from "../controllers/admin.controller.js";

/**
 * Admin routes
 */
const routerAdmin = Router();

/**
 * Get statistics
 * @method GET
 */
routerAdmin.get("/admin", authorizeRole(["admin"]), async (req, res) => {
  try {
    const users = await usersStatistics(req, res);
    const publications = await publicationsStatistics(req, res);
    const transactions = await transactionsStatistics(req, res);
    const comments = await commentsStatistics(req, res);

    res.status(200).json({
      users: users.data,
      publications: publications.data,
      transactions: transactions.data,
      comments: comments.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerAdmin;