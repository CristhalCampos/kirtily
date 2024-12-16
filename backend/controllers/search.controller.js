import { User } from "../models/users.model.js";
import { Publication } from "../models/publications.model.js";

/**
 * @description Search user by full name, username, bio or any of interests
 * @function searchUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {String} search - Search term
 * @query {Number} page - Page number
 * query {Number} limit - Limit of users
 * @returns {Object} - List of users
 * @method GET
 * @example http://localhost:3001/search?search=user&page=1&limit=10
 */
export const searchUser = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    if (!search) return res.status(400).json({ error: "Search term is required" });
    const users = await User.paginate(
      { $or: [
          { fullName: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
          { bio: { $regex: search, $options: "i" } },
          { interests: { $elemMatch: { $regex: search, $options: "i" } } }
        ],
        deleted: false,
        status: "active"
      },
      { username: 1, profilePicture: 1, interests: 1 },
      { page, limit }
    );
    users.docs.length > 0 ? res.status(200).json(users) : res.status(404).json({ error: "User not found" });
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * @description Search publication by author, hashtags, content or media
 * @function searchPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {String} search - Search term
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of publications
 * @returns {Object} - List of publications
 * @method GET
 * @example http://localhost:3001/search?search=publication&page=1&limit=10
 */
export const searchPublication = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    if (!search) return res.status(400).json({ error: "Search term is required" });
    const publications = await Publication.find(
      {
        $or: [
          { author: { $regex: search, $options: "i" }},
          { hashtags: { $elemMatch: { $regex: search, $options: "i" }}},
          { content: { $regex: search, $options: "i" }},
          { media: { $regex: search, $options: "i" }}
        ],
        deleted: false,
        status: "active"
      },
      { page, limit }
    );
    publications.docs.length > 0 ? res.status(200).json(publications) : res.status(404).json({ error: "Publication not found" });
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};