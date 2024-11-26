import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

/**
 * Schema for subscriptions
 * @typedef {Object} subscriptionSchema
 * @property {String} user - User of the subscription
 * @property {String} plan - Plan of the subscription
 * @property {Number} price - Price of the subscription
 * @property {Date} startDate - Start date of the subscription
 * @property {Date} endDate - End date of the subscription
 * @property {Boolean} isActive - Active status of the subscription
 */
const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["free", "premium"], default: "gratis" },
    price: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: false }
  }
);

/**
 * Plugin for pagination
 */
subscriptionSchema.plugin(mongoosePaginate);

/**
 * Model for subscriptions
 * @typedef {Object} Subscription
 */
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export { Subscription };