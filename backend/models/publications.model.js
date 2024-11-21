import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for publications
 * @typedef {Object} publicationSchema
 * @property {String} author - Author of the publication
 * @property {String} title - Title of the publication
 * @property {String} content - Content of the publication
 * @property {Array} media - Media of the publication
 * @property {Array} likes - Likes of the publication
 * @property {Array} comments - Comments of the publication
 * @property {Array} hashtags - Hashtags of the publication
 * @property {String} status - Status of the publication, "active" or "reported"
 * @property {Boolean} deleted - Deleted status of the publication
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of update
 */
const publicationSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    content: { type: String },
    media: { type: [String] },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment" },
    hashtags: { type: [String] },
    status: { type: String, enum: ["active", "reported"], default: "active" },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

/**
 * Plugin for pagination
 */
publicationSchema.plugin(mongoosePaginate);

/**
 * Model for publications
 * @typedef {Object} Publication
 */
const Publication = mongoose.model("Publication", publicationSchema);

export { Publication };