import { Message } from "../models/messages.model.js";

//Generate room id
const generateRoomId = (user1, user2) => {
  return [user1, user2].sort().join("_");
};

/**
 * Join your rooms
 * @function joinRooms
 * @param {Object} socket - Socket object
 * @param {Object} user - User object
 * @method POST
 * @example http://localhost:3001/messages
 */
export const joinRooms = (socket, user) => {
  const contacts = [...user.following];
  contacts.forEach((contact) => {
    const roomId = generateRoomId(user._id, contact);
    socket.join(roomId);
  });
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
    const messages = await Message.paginate({ room: req.params.room }, { page, limit });
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
    if (!req.body.room || !req.body.sender || !req.body.receiver || !req.body.content) {
      return res.status(400).json({ error: "Missing data" });
    }
    const message = new Message(req.body);
    await message.save();
    return res.status(200).json("Message sent");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Listen to a new message
 * @function listenToMessage
 * @param {Object} socket - Socket object
 * @param {Object} message - Message object
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/messages
 */
export const listenToMessage = (socket, message) => {
  socket.to(message.room).emit("message", message);
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
    await Message.findByIdAndUpdate(req.params.id, { read: true });
    return res.status(200).json("Message marked as read");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}