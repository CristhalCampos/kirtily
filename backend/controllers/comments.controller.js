import { Comment } from "../models/comments.model.js";
import { Publication } from "../models/publications.model.js";
import { User } from "../models/users.model.js";
import { createNotification } from "./notifications.controller.js";

/**
 * Get comments of a publication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of comments
 * @method GET
 * @example http://localhost:3001/publications/:id/comments
 */
export const getComments = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    const comments = await Comment.find({ _id: { $in: publication.comments } });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Comment on a publication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method POST
 * @example http://localhost:3001/publications/:id/comments
 */
export const comment = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    const user = await User.findOne(
      { username: req.user.username },
      { _id: 1, username: 1, status: 1, deleted: 1 }
    );
    const author = await User.findOne(
      { username: publication.author },
      { _id: 1, username: 1, status: 1, deleted: 1, blockOrUnblockUser: 1 });
    if (author.blockOrUnblockUser.includes(user._id)) {
      return res.status(403).json({ message: "User is blocked" });
    }
    const comment = new Comment(req.body);
    await comment.save();
    publication.comments.push(comment._id);
    await publication.save();
    await createNotification(refModel="Publication", author, user.username, publication, null, comment);
    return res.status(200).json("Comment created");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Report a comment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/publications/:id/comments/:commentId
 */
export const reportComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    comment.reported = true;
    await comment.save();
    return res.status(200).json("Comment reported");
  } catch (error) {
    error === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ message: error.message });
  }
}

/**
 * Delete comment from my publication
 * @function deleteComment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/publications/:id/comments/:commentId
 */
export const deleteCommentMyPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.deleted = true;
    await comment.save();
    publication.comments.pull(comment._id);
    await publication.save();
    return res.status(200).json("Comment deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message});
  }
}

/**
 * Delete comment from another user's publication
 * @function deleteComment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/publications/:id/comments/:commentId
 */
export const deleteCommentAnotherPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.deleted = true;
    await comment.save();
    publication.comments.pull(comment._id);
    await publication.save();
    return res.status(200).json("Comment deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}