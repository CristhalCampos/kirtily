import { User } from "../models/users.model.js";
import { Publication, Publication, Publication } from "../models/publications.model.js";
import { Comment } from "../models/comments.model.js";
import { Message } from "../models/messages.model.js";
import { Subscription } from "../models/subscriptions.model.js";

/**
 * Get porcentage change of registered users in the week
 */
export const registeredUsersWeek = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const lastWeek = new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000);
    const users = await User.find({
      createdAt: { $gte: currentWeek },
    });
    const lastWeekUsers = await User.find({
      createdAt: { $gte: lastWeek, $lt: currentWeek },
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "No registered users this week" });
    }
    let percentageChange;
    if (users.length < lastWeekUsers.length) {
      percentageChange = ((lastWeekUsers.length - users.length) / lastWeekUsers.length) * 100;
      res.status(200).json(`Percentage change: ${percentageChange.toFixed(2)}% decrease`);
    } else {
      percentageChange = ((users.length - lastWeekUsers.length) / lastWeekUsers.length) * 100;
      res.status(200).json(`Percentage change: ${percentageChange.toFixed(2)}% increase`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get highlight publications of the week
 */
export const highlightPublicationsWeek = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const highlightPublications = await Publication.find({
      createdAt: { $gte: currentWeek },
      highlight: true,
    });
    const publications = await Publication.find({
      createdAt: { $gte: currentWeek },
    })
    let percentage = (highlightPublications / publications) * 100;
    res.status(200).json(`${percentage.toFixed(2)}% of the publications of the week`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get comments from the publications with the most comments of the week
 */
export const mostCommentsWeek = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const topPublications = await Publication.aggregate([
      { $match: { createdAt: { $gte: currentWeek } } },
      { $project: { _id: 1, commentCount: { $size: "$comments" } } },
      { $sort: { commentCount: -1 } },
      { $limit: 10 },
    ]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Reporte: Usuarios que más mensajes enviaron y el número de mensajes en los últimos 7 días
export const messagingUsersWeek = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );

    const topMessagingUsers = await Message.aggregate([
      { $match: { createdAt: { $gte: currentWeek } } },
      { $group: { _id: "$sender", messageCount: { $sum: 1 } } },
      { $sort: { messageCount: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({ topMessagingUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get new premium subscriptions
 */
export const newPremiumSubscriptions = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );

    const newSubscriptions = await Subscription.find({
      plan: "premium",
      startDate: { $gte: currentWeek },
    }).countDocuments();

    res.status(200).json({ newSubscriptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};