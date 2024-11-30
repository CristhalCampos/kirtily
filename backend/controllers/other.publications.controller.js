import { Publication } from "../models/publications.model.js";
import { User } from "../models/users.model.js";
import { createNotification } from "./notifications.controller.js";

/**
 * View a publication
 * @function viewPublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {Object} - Publication
 * @method GET
 * @example http://localhost:3001/publications/:id
 */
export const viewPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * inspires me” reaction to a publication
 * @function inspiresMe
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {String} - Message
 * @method PATCH
 * @example http://localhost:3001/publications/:username
 */
export const inspiresMe = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { _id: 1, username: 1, status: 1, deleted: 1 });
    const publication = await Publication.findById(req.body.id);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    const author = await Publication.findOne({ username: publication.author });
    if (user.status === "blocked" || user.deleted || author.blokedUsers.includes(user._id)) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    publication.inspires += 1;
    await publication.save();
    author.inspires += 1;
    await author.save();
    await createNotification(refModel="Publication", user=author, otherUser=user.username, publication=publication, reaction="inspiresMe");
    res.status(200).json("Has reacted to this publication");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * I recommend it” reaction to a publication
 * @function recommendIt
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {String} - Message
 * @method PATCH
 * @example http://localhost:3001/publications/:username
 */
export const recommendIt = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { _id: 1, username: 1, status: 1, deleted: 1 });
    const publication = await Publication.findById(req.body.id);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    if (user.status === "blocked" || user.deleted || publication.author.blokedUsers.includes(user._id)) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    publication.recommends += 1;
    await publication.save();
    await createNotification(refModel="Publication", user=publication.author, otherUser=user.username, publication=publication, reaction="recommendIt");
    res.status(200).json("Has reacted to this publication");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * I want to contribute” reaction to a publication
 * @function wantToContribute
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {String} - Message
 * @method PATCH
 * @example http://localhost:3001/publications/:username
 */
export const wantToContribute = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }, { _id: 1, username: 1, status: 1, deleted: 1 });
    const publication = await Publication.findById(req.body.id);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    if (user.status === "blocked" || user.deleted || publication.author.blokedUsers.includes(user._id)) {
      return res.status(403).json({ error: "User is blocked or has been deleted" });
    }
    publication.wantsToContribute += 1;
    await publication.save();
    await createNotification(refModel="Publication", user=publication.author, publication=publication, reaction="wantToContribute");
    res.status(200).json("Has reacted to this publication");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Share a publication
 * @function sharePublication
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.id - Publication ID
 * @returns {String} - Link to the publication
 * @method PATCH
 * @example http://localhost:3001/publications/:id
 */
export const sharePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    publication.shares += 1;
    await publication.save();
    res.status(200).json(`http://localhost:3001/publications/${publication._id}`);
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
 * @returns {String} - Message
 * @method PATCH
 * @example http://localhost:3001/publications/:id
 */
export const reportPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    publication.status = "reported";
    await publication.save();
    res.status(200).json("Publication reported");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};