import { Comments } from "../models/comments.model.js";
import { Publication } from "../models/publications.model.js";

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
    if (!publication) return res.status(404).json({ message: "Publication not found" });
    const comments = await Comments.find({ _id: { $in: publication.comments } });
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
    if (!publication) return res.status(404).json({ message: "Publication not found" });
    const comment = new Comments(req.body);
    await comment.save();
    publication.comments.push(comment._id);
    await publication.save();
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
    const comment = await Comments.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    comment.reported = true;
    await comment.save();
    return res.status(200).json("Comment reported");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * Delete comment from my publication
 */
export const deleteCommentMyPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: "Publication not found" });
    const comment = await Comments.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    comment.deleted = true;
    await comment.save();
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
    if (!publication) return res.status(404).json({ message: "Publication not found" });
    const comment = await Comments.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    comment.deleted = true;
    await comment.save();
    return res.status(200).json("Comment deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}