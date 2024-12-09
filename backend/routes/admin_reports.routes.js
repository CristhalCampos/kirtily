import { Router } from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { registeredUsersReport, highlightPublicationsReport, mostCommentsReport, messagingUsersReport, premiumSubscriptionsReport } from "../controllers/admin_reports.controller.js";

/**
 * Admin reports routes
 */
const routerAdminReports = Router();

/**
 * Get registered users report
 * @method GET
 */
routerAdminReports.get("/admin/reports/users", authorizeRole(["admin"]), registeredUsersReport);

/**
 * Get highlight publications report
 * @method GET
 */
routerAdminReports.get("/admin/reports/publications", authorizeRole(["admin"]), highlightPublicationsReport);

/**
 * Get most comments report
 * @method GET
 */
routerAdminReports.get("/admin/reports/comments", authorizeRole(["admin"]), mostCommentsReport);

/**
 * Get messaging users report
 * @method GET
 */
routerAdminReports.get("/admin/reports/messages", authorizeRole(["admin"]), messagingUsersReport);

/**
 * Get premium subscriptions report
 * @method GET
 */
routerAdminReports.get("/admin/reports/suscriptions", authorizeRole(["admin"]), premiumSubscriptionsReport);

export default routerAdminReports;