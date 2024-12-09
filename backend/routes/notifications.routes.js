import { Router } from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { getNotifications, markAsRead } from "../controllers/notifications.controller.js";

/**
 * Notifications routes
 */
const routerNotifications = Router();

/**
 * Get notifications
 * @method GET
 */
routerNotifications.get("/notifications", authorizeRole(["user", "userPremium", "admin"]), getNotifications);

/**
 * Mark notification as read
 * @method PATCH
 */
routerNotifications.patch("/notifications/:id", authorizeRole(["user", "userPremium", "admin"]), markAsRead);

export default routerNotifications;