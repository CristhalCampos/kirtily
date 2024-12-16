import { User } from "../models/users.model.js";
import { Publication } from "../models/publications.model.js";
import { Message } from "../models/messages.model.js";
import { Subscription } from "../models/subscriptions.model.js";

/**
 * @description Get registered users report
 * @function registeredUsersReport
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.period - Period for the report ("weekly", "monthly", "yearly")
 * @returns {Object} - List of registered users in a period and percentage change with respect to the previous period
 * @method POST
 * @example http://localhost:3001/admin/reports/users
 */
export const registeredUsersReport = async (req, res) => {
  try {
    const period = req.body.period;
    const now = new Date();
    let start, previousStart, previousEnd;
    switch (period) {
      case "weekly":
        start = new Date(now.setDate(now.getDate() - 7));
        previousEnd = new Date(start);
        previousStart = new Date(previousEnd.setDate(previousEnd.getDate() - 7));
        break;
      case "monthly":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        previousEnd = new Date(start);
        previousStart = new Date(previousEnd.getFullYear(), previousEnd.getMonth() - 1, 1);
        break;
      case "yearly":
        start = new Date(now.getFullYear(), 0, 1);
        previousEnd = new Date(start);
        previousStart = new Date(previousEnd.getFullYear() - 1, 0, 1);
        break;
      default:
        return res.status(400).json({ error: "Invalid period. Use 'weekly', 'monthly', or 'yearly'." });
    }
    const currentCount = await User.countDocuments({ createdAt: { $gte: start }, deleted: false });
    const previousCount = await User.countDocuments({ createdAt: { $gte: previousStart, $lt: previousEnd }, deleted: false });
    let percentageChange = null;
    if (previousCount > 0) {
      percentageChange = ((currentCount - previousCount) / previousCount) * 100;
    }
    res.status(200).json({
      period: {
        start: start.toDateString(),
        end: new Date().toDateString(),
        count: currentCount,
      },
      previousPeriod: {
        start: previousStart.toDateString(),
        end: previousEnd.toDateString(),
        count: previousCount,
      },
      percentageChange: percentageChange !== null
        ? `${percentageChange.toFixed(2)}% ${percentageChange >= 0 ? "increase" : "decrease"}`
        : "No previous data to compare",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Get highlight publications report
 * @function highlightPublicationsReport
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.period - Period for the report ("weekly", "monthly", "yearly")
 * @returns {Object} - Percentage of highlighted publications in a period
 * @method POST
 */
export const highlightPublicationsReport = async (req, res) => {
  try {
    const period = req.body.period;
    const now = new Date();
    let start;

    switch (period) {
      case "weekly":
        start = new Date(now.setDate(now.getDate() - 7));
        break;
      case "monthly":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "yearly":
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return res.status(400).json({ error: "Invalid period. Use 'weekly', 'monthly', or 'yearly'." });
    }

    const totalPublications = await Publication.countDocuments({ createdAt: { $gte: start } });
    const highlightedPublications = await Publication.countDocuments({ createdAt: { $gte: start }, highlight: true });

    const percentage = totalPublications > 0
      ? (highlightedPublications / totalPublications) * 100
      : 0;

    res.status(200).json({
      period: { start: start.toISOString(), end: new Date().toISOString() },
      highlightedPublications,
      totalPublications,
      percentage: `${percentage.toFixed(2)}%`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Get publications with most comments report
 * @function mostCommentsReport
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.period - Period for the report ("weekly", "monthly", "yearly")
 * @returns {Object} - List of publications with the most comments
 * @method POST
 */
export const mostCommentsReport = async (req, res) => {
  try {
    const period = req.body.period;
    const now = new Date();
    let start;

    switch (period) {
      case "weekly":
        start = new Date(now.setDate(now.getDate() - 7));
        break;
      case "monthly":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "yearly":
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return res.status(400).json({ error: "Invalid period. Use 'weekly', 'monthly', or 'yearly'." });
    }

    const topPublications = await Publication.aggregate([
      { $match: { createdAt: { $gte: start } } },
      { $project: { _id: 1, title: 1, commentCount: { $size: "$comments" } } },
      { $sort: { commentCount: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({
      period: { start: start.toISOString(), end: new Date().toISOString() },
      topPublications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
* @description Get top messaging users report
* @function messagingUsersReport
* @param {Object} req - Request object
* @param {Object} res - Response object
* @param {String} req.body.period - Period for the report ("weekly", "monthly", "yearly")
* @returns {Object} - List of top messaging users
* @method POST
*/
export const messagingUsersReport = async (req, res) => {
  try {
    const period = req.body.period;
    const now = new Date();
    let start;

    switch (period) {
      case "weekly":
        start = new Date(now.setDate(now.getDate() - 7));
        break;
      case "monthly":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "yearly":
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return res.status(400).json({ error: "Invalid period. Use 'weekly', 'monthly', or 'yearly'." });
    }

    const topMessagingUsers = await Message.aggregate([
      { $match: { createdAt: { $gte: start } } },
      { $group: { _id: "$sender", messageCount: { $sum: 1 } } },
      { $sort: { messageCount: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      period: { start: start.toISOString(), end: new Date().toISOString() },
      topMessagingUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
* @description Get new premium subscriptions report
* @function premiumSubscriptionsReport
* @param {Object} req - Request object
* @param {Object} res - Response object
* @param {String} req.body.period - Period for the report ("weekly", "monthly", "yearly")
* @returns {Object} - Count of new premium subscriptions
* @method POST
*/
export const premiumSubscriptionsReport = async (req, res) => {
  try {
    const period = req.body.period;
    const now = new Date();
    let start;

    switch (period) {
      case "weekly":
        start = new Date(now.setDate(now.getDate() - 7));
        previousEnd = new Date(start);
        previousStart = new Date(previousEnd.setDate(previousEnd.getDate() - 7));
        break;
      case "monthly":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        previousEnd = new Date(start);
        previousStart = new Date(previousEnd.getFullYear(), previousEnd.getMonth() - 1, 1);
        break;
      case "yearly":
        start = new Date(now.getFullYear(), 0, 1);
        previousEnd = new Date(start);
        previousStart = new Date(previousEnd.getFullYear() - 1, 0, 1);
        break;
      default:
        return res.status(400).json({ error: "Invalid period. Use 'weekly', 'monthly', or 'yearly'." });
    }
    const currentSubscriptions = await Subscription.countDocuments({
      plan: "premium",
      startDate: { $gte: start },
    });
    const previousSubscriptions = await Subscription.countDocuments({
      plan: "premium",
      startDate: { $gte: previousStart, $lt: previousEnd },
    });
    let percentageChange = ((currentSubscriptions - previousSubscriptions) / previousSubscriptions) * 100;
    res.status(200).json({
      period: {
        start: start.toISOString(),
        end: new Date().toISOString(),
        currentSubscriptions: currentSubscriptions,
      },
      previousPeriod: {
        start: previousStart.toISOString(),
        end: previousEnd.toISOString(),
        previousSubscriptions: previousSubscriptions,
      },
      percentageChange: percentageChange,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};