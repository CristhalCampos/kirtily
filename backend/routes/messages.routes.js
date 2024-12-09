import { Router } from "express";
import { getChatsByUser, getMessagesByChat, sendMessage, markAsRead } from "../controllers/messages.controller.js";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";

/**
 * Messages routes
 */
const routerMessages = Router();

/**
 * Get chats by user
 * @method GET
 */
routerMessages.get("/messages/:user", authorizeRole(["user", "userPremium", "admin"]), getChatsByUser);

/**
 * Get messages by room
 * @method GET
 */
routerMessages.get("/messages/:chat", authorizeRole(["user", "userPremium", "admin"]), getMessagesByChat);

/**
 * Send message
 * @method POST
 */
routerMessages.post("/messages/:chat", authorizeRole(["user", "userPremium", "admin"]), sendMessage);

/**
 * Mark message as read
 * @method PATCH
 */
routerMessages.patch("messages/:chat", authorizeRole(["user", "userPremium", "admin"]), markAsRead);

export default routerMessages;