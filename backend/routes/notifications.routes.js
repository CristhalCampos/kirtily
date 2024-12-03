import { Router } from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { getNotifications, markAsRead, createNotification } from "../controllers/notifications.controller.js";

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

/**
 * Create notification
 * @method POST
 */
routerNotifications.post("/notifications", authorizeRole(["user", "userPremium", "admin"]), createNotification);

export default routerNotifications;