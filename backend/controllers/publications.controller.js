import { Publication } from "../models/publications.model.js";
import { User } from "../models/users.model.js";

/**
 * View my publication
 * @function viewPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Updated publication
 * @method GET
 * @example http://localhost:3001/publications/:id
 */
export const viewMyPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json(publication);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Create a new publication
 * @function createPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Created publication
 * @method POST
 * @example http://localhost:3001/publications
 */
export const createPublication = async (req, res) => {
  try {
    if (req.file) {
      req.body.media = req.file.path;
    }
    const publication = new Publication(req.body);
    await publication.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { publications: publication._id } });
    res.status(201).json("Publication created");
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Edit a publication
 * @function editPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Updated publication
 * @method PATCH
 * @example http://localhost:3001/publications/:id
 */
export const editPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication || publication.deleted) {
      return res.status(404).json({ error: "Publication not found or deleted" });
    }
    if (req.file) {
      req.body.media = req.file.path;
    }
    await Publication.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("Publication updated");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Create a highlight publication
 * @function createFeaturedPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Updated publication
 * @method PATCH
 * @example http://localhost:3001/publications/:id
 */
export const createHighlightPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication || publication.deleted) {
      return res.status(404).json({ error: "Publication not found or deleted" });
    }
    if (publication.highlight) {
      return res.status(400).json({ error: "Publication already highlighted" });
    }
    await Publication.findByIdAndUpdate(req.params.id, { highlight: true });
    await User.findByIdAndUpdate(publication.author, { $push: { highlights: publication._id } });
    res.status(200).json(publication);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get publications by user, first the highlights and then the non-highlights
 * @function getPublicationsByUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - User ID
 * @returns {Object} - List of publications
 * @method GET
 * @example http://localhost:3001/publications/user/:id
 */
export const getPublicationsByUser = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const publications = await Publication.paginate(
      { author: req.params.id, deleted: false },
      { page, limit }
    )
    if (publications.docs.length > 0) {
      const highlights = await Publication.find({ author: req.params.id, highlight: true, deleted: false });
      publications.docs = [...highlights, ...publications.docs];
    }
    res.status(200).json(publications);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete a publication
 * @function deletePublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Deleted publication
 * @method DELETE
 * @example http://localhost:3001/publications/:id
 */
export const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication || publication.deleted) {
      return res.status(404).json({ error: "Publication not found or deleted" });
    }
    await Publication.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json("Publication deleted");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
};