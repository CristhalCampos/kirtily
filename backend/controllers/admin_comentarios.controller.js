import { Comment } from "../models/comments.model.js";

/**
 * Get all comments
 * @function getAllComments
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of comments
 * @method GET
 * @example http://localhost:3001/admin/comments
 */
export const getAllComments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const comments = await Comment.paginate({ deleted: false }, { page, limit });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Delete comment
 * @function deleteComment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/admin/comments/:id
 */
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    await Comment.findOneAndUpdate({ _id: req.params.id }, { $set: { deleted: true } });
    return res.status(200).json("Comment deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
