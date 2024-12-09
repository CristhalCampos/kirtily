import { Message } from "../models/messages.model.js";
import { Chat } from "../models/chats.model.js";
import { createNotification } from "./notifications.controller.js";

/**
 * Get chats by user
 * @function getChatsByUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.user - User ID
 * @return {Object} - List of chats
 * @method GET
 * @example http://localhost:3001/messages/:user
 */
export const getChatsByUser = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const chats = await Chat.paginate(
      { users: req.params.user },
      {
        page,
        limit,
        sort: { createdAt: -1 },
        populate: [
          { path: "users", select: "username profilePicture" },
          { path: "messages", options: { sort: { createdAt: -1 }, limit: 1 } },
        ],
      }
    );
    return res.status(200).json(chats);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Get messages by chat
 * @function getMessagesByChat
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.chat - Chat ID
 * @return {Object} - List of messages
 * @method GET
 * @example http://localhost:3001/messages/:chat
 */
export const getMessagesByChat = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const messages = await Message.paginate(
      { chat: req.params.chat },
      { page, limit, sort: { createdAt: -1 } }
    );
    return res.status(200).json(messages);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Send a message
 * @function sendMessage
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.chat - Chat ID
 * @param {String} req.body.sender - Sender ID
 * @param {String} req.body.receiver - Receiver ID
 * @param {String} req.body.content - Message content
 * @return {Object} - Message
 * @method POST
 * @example http://localhost:3001/messages/:chat
 */
export const sendMessage = async (req, res) => {
  try {
    if (!req.params.chat || !req.body.sender || !req.body.receiver || !req.body.content) {
      return res.status(400).json({ error: "Missing data" });
    }
    const message = new Message({
      chat: req.params.chat,
      sender: req.body.sender,
      receiver: req.body.receiver,
      content: req.body.content,
    });
    await message.save();
    await Chat.findByIdAndUpdate(req.params.chat, { $push: { messages: message._id } });
    await createNotification("Message", req.body.receiver, req.body.sender, null, null, null, null, message);
    return res.status(200).json("Message sent");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Mark as read
 * @function markAsRead
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.id - Message ID
 * @return {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/messages/:chat
 */
export const markAsRead = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ error: "Missing message ID" });
    }
    await Message.findByIdAndUpdate(req.body.id, { read: true });
    return res.status(200).json("Message marked as read");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}