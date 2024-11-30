import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for notifications
 * @typedef {Object} notificationSchema
 * @property {String} user - User of the notification
 * @property {Array} type - Type of the notification
 * @property {String} content - Content of the notification
 * @property {Date} createdAt - Date of creation
 * @property {Boolean} read - Read status of the notification
 */
const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    type: [{ type: String, enum: ["follower", "publication", "reaction", "comment", "message"], required: true }],
    refId: { type: mongoose.Schema.Types.ObjectId, refPath: "refModel" },
    refModel: { type: String, enum: ["User", "Publication", "Message"] },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
  }
);

/**
 * Plugin for pagination
 */
notificationSchema.plugin(mongoosePaginate);

/**
 * Model for notifications
 * @typedef {Object} Notification
 */
const Notification = mongoose.model("Notification", notificationSchema);

export { Notification };