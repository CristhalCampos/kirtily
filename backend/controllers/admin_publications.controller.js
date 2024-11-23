import { Publication, Publication } from "../models/publications.model.js";

/**
 * Get all publications
 * @function getAllPublications
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - List of publications
 * @method GET
 * @example http://localhost:3001/admin/publications
 */
export const getAllPublications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const publications = await Publication.paginate({ deleted: false }, { page, limit });
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete publication
 * @function deletePublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/admin/publications/:id
 */
export const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: "Publication not found" });
    publication.deleted = true;
    await publication.save();
    await Publication.findOneAndUpdate({ _id: req.params.id }, { deleted: true });
    res.status(200).json("Publication deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};