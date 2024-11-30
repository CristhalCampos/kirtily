import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";
import { getNotifications, markAsRead } from "../controllers/notifications.controller.js";

/**
 * Notifications routes
 */
const routerNotifications = Router();

/**
 * Get notifications
 * @method GET
 */
routerNotifications.get("/notifications", authenticateToken, getNotifications);

/**
 * Mark notification as read
 * @method PATCH
 */
routerNotifications.patch("/notifications/:id", authenticateToken, markAsRead);

export default routerNotifications;