import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for users
 * @typedef {Object} userSchema
 * @property {String} fullName - Full name of the user
 * @property {String} username - Username of the user
 * @property {String} email - Email of the user
 * @property {String} password - Password of the user
 * @property {String} role - Role of the user, "admin", "user" or "userpremium"
 * @property {String} status - Status of the user, "active", "blocked" or "reported"
 * @property {Array} interests - Interests of the user
 * @property {String} profilePicture - Profile picture of the user
 * @property {String} bio - Bio of the user
 * @property {Array} followers - Followers of the user
 * @property {Array} following - Following of the user
 * @property {Array} publications - Publications of the user
 * @property {Object} subscription - Subscription of the user
 * @property {Boolean} deleted - Deleted status of the user
 * @property {Array} blockedUsers - Blocked users of the user
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of update
 */
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return this.fullName.toLowerCase().replace(/ /g, "") + Math.round(Math.random() * 10);
      },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "userpremium"], default: "user" },
    status: { type: String, enum: ["active", "blocked", "reported"], default: "active" },
    interests: [{ type: String, enum: ["music", "technology", "food", "bakery", "design", "gospel", "dance", "art"] }],
    profilePicture: { type: String },
    bio: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    publications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publication" }],
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    deleted: { type: Boolean, default: false },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);
    
/**
 * Plugin for pagination
 */
userSchema.plugin(mongoosePaginate);

/**
 * Model for users
 * @typedef {Object} User
 */
const User = mongoose.model("User", userSchema);

export { User };