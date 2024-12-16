import { Comment } from "../models/comments.model.js";

/**
 * @description Get all comments
 * @function getAllComments
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of comments
 * @returns {Object} - List of comments
 * @method GET
 * @example http://localhost:3001/admin/comments?page=1&limit=10
 */
export const getAllComments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const comments = await Comment.paginate({ deleted: false }, { page, limit });
    return res.status(200).json(comments);
  } catch (error) {
    error === "ValidationError"
    ? res.status(400).json({ error: error.message} )
    : res.status(500).json({ error: "Internal server error"});
  }
};

/**
 * @description Delete comment
 * @function deleteComment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.id - Id of the comment
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/admin/comments
 */
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.body.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    await Comment.findByIdAndUpdate( comment._id, { deleted: true } );
    return res.status(200).json("Comment deleted");
  } catch (error) {
    error === "CastError"
    ? res.status(400).json({ error: error.message} )
    : res.status(500).json({ error: "Internal server error"});
  }
};
