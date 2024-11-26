import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for messages
 * @typedef {Object} messageSchema
 * @property {String} sender - Sender of the message
 * @property {String} receiver - Receiver of the message
 * @property {String} content - Content of the message
 * @property {Date} createdAt - Date of creation
 * @property {Boolean} read - Read status of the message
 */
const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date },
    read: { type: Boolean, default: false }
  }
);

/**
 * Plugin for pagination
 */
messageSchema.plugin(mongoosePaginate);

/**
 * Model for messages
 * @typedef {Object} Message
 */
const Message = mongoose.model("Message", messageSchema);

export { Message };