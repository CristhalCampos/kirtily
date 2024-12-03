import { Router} from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { usersStatistics, publicationsStatistics, transactionsStatistics, commentsStatistics } from "../controllers/admin.controller.js";

/**
 * Admin routes
 */
const routerAdmin = Router();

routerAdmin.get("/admin", authorizeRole(["admin"]), usersStatistics, publicationsStatistics, transactionsStatistics, commentsStatistics);

export default routerAdmin;