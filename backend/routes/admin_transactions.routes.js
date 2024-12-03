import { Router} from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { getAllTransactions } from "../controllers/admin_transactions.controller.js";

/**
 * Admin transactions routes
 */
const routerAdminTransactions = Router();

/**
 * Get all transactions
 * @method GET
 */
routerAdminTransactions.get("/admin/transactions", authorizeRole(["admin"]), getAllTransactions);

export default routerAdminTransactions;