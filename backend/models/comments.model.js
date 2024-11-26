import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for comments
 * @typedef {Object} commentSchema
 * @property {String} publication - Publication of the comment
 * @property {String} author - Author of the comment
 * @property {String} content - Content of the comment
 * @property {String} status - Status of the comment, "active" or "reported"
 * @property {Boolean} deleted - Deleted status of the comment
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of update
 */
const commentSchema = new mongoose.Schema(
  {
    publication: { type: mongoose.Schema.Types.ObjectId, ref: "Publication", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ["active", "reported"], default: "active" },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

/**
 * Plugin for pagination
 */
commentSchema.plugin(mongoosePaginate);

/**
 * Model for comments
 * @typedef {Object} Comment
 */
const Comment = mongoose.model("Comment", commentSchema);

export { Comment };