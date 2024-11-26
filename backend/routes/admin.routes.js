import { Router} from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/authenticate.middleware.js";
import { usersStatistics, publicationsStatistics, transactionsStatistics, commentsStatistics } from "../controllers/admin.controller.js";

/**
 * Admin routes
 */
const routerAdmin = Router();

routerAdmin.get("/admin", authenticateToken, authorizeRoles("admin"), usersStatistics, publicationsStatistics, transactionsStatistics, commentsStatistics);

export default routerAdmin;