import { Router } from "express";
import { joinRooms, getMessagesByRoom, sendMessage, markAsRead } from "../controllers/messages.controller.js";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";

/**
 * Messages routes
 */
const routerMessages = Router();

/**
 * Join rooms
 * @method POST
 */
routerMessages.post("/messages", authorizeRole(["user", "userPremium", "admin"]), (req, res) => joinRooms(req, res, io));

/**
 * Get messages by room
 * @method GET
 */
routerMessages.get("/messages/:roomId", authorizeRole(["user", "userPremium", "admin"]), getMessagesByRoom);

/**
 * Send message
 * @method POST
 */
routerMessages.post("/messages/:roomId", authorizeRole(["user", "userPremium", "admin"]), sendMessage);

/**
 * Mark message as read
 * @method PATCH
 */
routerMessages.patch("messages/:roomId", authorizeRole(["user", "userPremium", "admin"]), markAsRead);

export default routerMessages;