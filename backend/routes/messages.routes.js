import { Router } from "express";
import {
  joinRooms,
  getMessagesByRoom,
  sendMessage,
  markAsRead
} from "../controllers/messages.controller.js";

/**
 * Messages routes
 */
const routerMessages = Router();

/**
 * Join rooms
 * @method POST
 */
routerMessages.post("/messages", (req, res) => joinRooms(req, res, io));

/**
 * Get messages by room
 * @method GET
 */
routerMessages.get("/messages/:roomId", getMessagesByRoom);

/**
 * Send message
 * @method POST
 */
routerMessages.post("/messages/:roomId", sendMessage);

/**
 * Mark message as read
 * @method PATCH
 */
routerMessages.patch("messages/:roomId", markAsRead);

export default routerMessages;