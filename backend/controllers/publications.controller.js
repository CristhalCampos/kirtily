import { Publication } from "../models/publications.model.js";

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
    const publication = await Publication.create(req.body);
    res.status(201).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a featured publication
 * @function createFeaturedPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Updated publication
 * @method PATCH
 * @example http://localhost:3001/publications/:id
 */
export const createFeaturedPublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const publication = await Publication.findByIdAndDelete(req.params.id);
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};