import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for chats
 * @typedef {Object} chatSchema
 * @property {Array} users - Users of the chat
 * @property {Array} messages - Messages of the chat
 * @property {Date} createdAt - Date of creation
 */
const chatSchema = new mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    createdAt: { type: Date, default: Date.now }
  }
);

/**
 * Plugin for pagination
 */
chatSchema.plugin(mongoosePaginate);

/**
 * Model for chats
 */
const Chat = mongoose.model("Chat", chatSchema);

export { Chat };