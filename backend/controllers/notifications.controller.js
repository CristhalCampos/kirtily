import { Notification } from "../models/notifications.model.js";

/**
 * Get notifications
 * @function getAllNotifications
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of notifications
 * @method GET
 * @example http://localhost:3001/notifications
 */
export const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const notifications = await Notification.paginate({ read: false }, { page, limit });
    return res.status(200).json(notifications);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Mark notification as read
 * @function markAsRead
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Notification
 * @method PATCH
 * @example http://localhost:3001/notifications/:id
 */
export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    return res.status(200).json("Notification marked as read");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Create notification
 * @function createNotification
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Notification
 * @method POST
 * @example http://localhost:3001/notifications
 */
export const createNotification = async (
  refModel,
  user,
  otherUser = null,
  publication = null,
  otherPublication = null,
  comment = null,
  reaction = null,
  message = null
) => {
  try {
    if (refModel === "User") {
      const notification = new Notification({
        user,
        type: ["follower"],
        refModel: "User",
        refId: otherUser,
        content: "You have a new follower"
      });
      await notification.save();
    } else if (refModel === "Publication" && comment) {
      const notification = new Notification({
        user,
        type: ["comment"],
        refModel: "Publication",
        refId: publication,
        content: `${otherUser.username} has commented on your publication`
      });
      await notification.save();
    } else if (refModel === "Publication" && otherPublication) {
      const notification = new Notification({
        user,
        type: ["publication"],
        refModel: "Publication",
        refId: otherPublication,
        content: `${otherUser.username} has created a new publication`
      });
      await notification.save();
    } else if (refModel === "Message") {
      const notification = new Notification({
        user,
        type: ["message"],
        refModel: "Message",
        refId: message.roomId,
        content: `You have a new message from ${otherUser.username}`
      });
      await notification.save();
    } else {
      if (reaction === "inspiresMe") {
        const notification = new Notification({
          user,
          type: ["reaction"],
          refModel: "Publication",
          refId: publication,
          content: `${otherUser.username} inspires you`
        });
        await notification.save();
      } else if (reaction === "recommendIt") {
        const notification = new Notification({
          user,
          type: ["reaction"],
          refModel: "Publication",
          refId: publication,
          content: `${otherUser.username} recommends it`
        });
        await notification.save();
      } else if (reaction === "wantToContribute") {
        const notification = new Notification({
          user,
          type: ["reaction"],
          refModel: "Publication",
          refId: publication,
          content: `${otherUser.username} wants to contribute`
        });
        await notification.save();
      }
    }
    return res.status(201).json("Notification sent");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}