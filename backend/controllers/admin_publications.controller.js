import { Publication } from "../models/publications.model.js";

/**
 * Get all publications
 * @function getAllPublications
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of publications
 * @returns {Object} - List of publications
 * @method GET
 * @example http://localhost:3001/admin/publications?page=1&limit=10
 */
export const getAllPublications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const publications = await Publication.paginate({ deleted: false }, { page, limit });
    res.status(200).json(publications);
  } catch (error) {
    error === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete publication
 * @function deletePublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.body.id - Publication ID
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/admin/publications
 */
export const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.body.id);
    if (!publication) return res.status(404).json({ message: "Publication not found" });
    publication.deleted = true;
    await publication.save();
    await Publication.findByIdAndUpdate(req.body.id, { deleted: true });
    res.status(200).json("Publication deleted");
  } catch (error) {
    error === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};