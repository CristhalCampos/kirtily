import { User } from "../models/users.model.js";
import { Publication } from "../models/publications.model.js";

/**
 * @description Get feed publications
 * @function getFeedPublications
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of publications
 * @returns {Object} - List of publications
 * @method GET
 * @example http://localhost:3001/feed?page=1&limit=10
 */
export const getFeedPublications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const user = await User.findById(req.user.id).populate("following");
    const followingIds = user.following.map((u) => u._id);
    const publications = await Publication.find({ author: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "username profilePicture");
    res.status(200).json({
      publications,
      currentPage: page,
      totalPublications: publications.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Get user suggestions
 * @function getUserSuggestions
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of users
 * @method GET
 * @example http://localhost:3001/feed
 */
export const getUserSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("following");
    const followingIds = user.following.map((u) => u._id);
    const suggestions = await User.find({
      _id: { $nin: [...followingIds] }
    })
      .limit(5)
      .select("username profilePicture");
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Get highlighted publications
 * @function getHighlightedPublications
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of publications
 * @method GET
 * @example http://localhost:3001/feed
 */
export const getHighlightedPublications = async (req, res) => {
  try {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const highlightedPublications = await Post.find({ highlight: true, createdAt: { $gte: yesterday } })
      .sort({ createdAt: -1, likes: -1, commentsCount: -1 })
      .limit(10)
      .populate("author", "username profilePicture");

    res.status(200).json({ highlightedPublications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};