import { Publication } from "../models/publications.model.js";

/**
 * View a publication
 * @function viewPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Updated publication
 * @method GET
 * @example http://localhost:3001/publications/:id
 */
export const viewPublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * inspires me” reaction to a publication
 */
export const inspiresMe = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    publication.inspires += 1;
    await publication.save();
    const author = await Publication.findOne({ username: publication.author });
    author.inspires += 1;
    await author.save();
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * I recommend it” reaction to a publication
 */
export const recommendIt = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    publication.recommendIt += 1;
    await publication.save();
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * I want to contribute” reaction to a publication
 */
export const wantToContribute = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    publication.wantToContribute += 1;
    await publication.save();
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Share a publication
 * @function sharePublication
 */
export const sharePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    publication.shares += 1;
    await publication.save();
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Report a publication
 * @function reportPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Updated publication
 * @method PATCH
 * @example http://localhost:3001/publications/:id
 */
export const reportPublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};