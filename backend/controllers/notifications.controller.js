import { Notification } from "../models/notifications.model.js";

/**
 * @description Get notifications
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
 * @description Mark notification as read
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
 * @description Create notification
 * @function createNotification
 * @param {String} refModel - Reference model
 * @param {Object} user - User object
 * @param {Object} otherUser - Other user object
 * @param {Object} publication - Publication object
 * @param {Object} otherPublication - Other publication object
 * @param {Object} comment - Comment object
 * @param {Object} reaction - Reaction object
 * @param {Object} message - Message object
 * @returns {Object} - Notification
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
        content: `${otherUser.username} is following you`
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
      user.followers.forEach(async (follower) => {
        if (publication.highlight) {
          const notification = new Notification({
            user: follower,
            type: ["publication"],
            refModel: "Publication",
            refId: otherPublication,
            content: `${otherUser.username} has created a highlight publication`
          })
          await notification.save();
        }
        const notification = new Notification({
          user: follower,
          type: ["publication"],
          refModel: "Publication",
          refId: otherPublication,
          content: `${otherUser.username} has created a new publication`
        });
        await notification.save();
      })
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