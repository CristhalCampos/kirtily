import { Message } from "../models/messages.model.js";
import { User } from "../models/users.model.js";
import { createNotification } from "./notifications.controller.js";

export const joinRooms = async (req, res, io) => {
  try {
  const user = await User.findOne({ username: req.body.username });

  if (!user || !user.following) {
    return res.status(400).json({ error: "User not found" });
  }

  const rooms = [];
  user.following.forEach((contact) => {
    const roomId = await [user._id, contact].sort().join("_");
    rooms.push(roomId);
  });

  // Emitir un evento para unir al cliente a las salas
  rooms.forEach((room) => {
    io.sockets.sockets.get(req.body.socketId)?.join(room);
  });

  res.status(200).json({ message: "Salas unidas con éxito", rooms });
  } catch (error) {
    res.status(500).json({ error: "Error al unir las salas" });
  }
};

/**
 * Get messages by room
 * @function getMessagesByRoom
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @return {Object} - List of messages
 * @method GET
 * @example http://localhost:3001/messages/:room
 */
export const getMessagesByRoom = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const messages = await Message.paginate({ room: req.params.roomId }, { page, limit });
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
 * @return {Object} - Message
 * @method POST
 * @example http://localhost:3001/messages/:room
 */
export const sendMessage = async (req, res) => {
  try {
    if (!req.params.roomId || !req.body.sender || !req.body.receiver || !req.body.content) {
      return res.status(400).json({ error: "Missing data" });
    }
    const message = new Message(req.body);
    await message.save();
    //notificarle al otro usuario que ha recibido el mensaje
    await createNotification("Message", req.body.receiver, req.body.sender, null, null, null, null, message);
    return res.status(200).json("Message sent");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * mark as read
 * @function markAsRead
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @return {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/messages/:room
 */
export const markAsRead = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.body.id, { read: true });
    return res.status(200).json("Message marked as read");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}