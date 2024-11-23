import { User } from "../models/users.model.js";

// Verify that users is not blocked or deleted
const verifyUsers = (myUser, otherUser) => {
  if (!myUser) return res.status(404).json({ error: "User not found" });
  if (myUser.status === "blocked" || myUser.deleted) {
    return res.status(403).json({ error: "Your user is blocked or has been deleted" });
  }
  if (!otherUser) return res.status(404).json({ error: "User not found" });
  if (otherUser.status === "blocked" || otherUser.deleted) {
    return res.status(403).json({ error: "The user is blocked or has been deleted" });
  }
}

/**
 * View user profile
 * @function viewUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @body {String} username - Username of the user
 * @returns {Object} - User
 * @method GET
 * @example http://localhost:3001/users/:username
 */
export const viewUser = async (req, res) => {
  try {
    const myUser = await User.findOne({ username: req.params.username }, { username: 1, status: 1, deleted: 1, blockedUsers: 1 });
    const otherUser = await User.findOne({ username: req.body.username }, { status: 1, deleted: 1, fullName: 1, username: 1, profilePicture: 1, bio: 1, interests: 1, followers: 1, following: 1, subscription: 1 });
    if (myUser.username === otherUser.username) {
      return res.status(200).json({ message: "Viewing own profile", user: myUser });
    }
    await verifyUsers(myUser, otherUser);
    res.status(200).json(otherUser);
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: "Invalid user id" })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Follow or unfollow user
 * @function followOrUnfollowUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of my user
 * @body {String} username - Username of the user I want to follow or unfollow
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/users/:username
 */
export const followOrUnfollowUser = async (req, res) => {
  try {
    const myUser = await User.findOne({ username: req.params.username }, { _id: 1, status: 1, deleted: 1, followers: 1, following: 1 });
    const otherUser = await User.findOne({ username: req.body.username }, { _id: 1, status: 1, deleted: 1, followers: 1, following: 1, blockedUsers: 1 });
    await verifyUsers(myUser, otherUser);
    if (myUser.following.includes(otherUser._id)) {
      myUser.following.pull(otherUser._id);
      await User.findOneAndUpdate({ _id: myUser._id }, { following: myUser.following });
      otherUser.followers.pull(myUser._id);
      await User.findOneAndUpdate({ _id: otherUser._id }, { followers: otherUser.followers });
      return res.status(200).json("User unfollowed");
    } else {
      if (otherUser.blockedUsers.includes(myUser._id)) {
        return res.status(403).json({ error: "The user has you blocked" });
      }
      myUser.following.push(otherUser._id);
      await User.findOneAndUpdate({ _id: myUser._id }, { following: myUser.following });
      otherUser.followers.push(myUser._id);
      await User.findOneAndUpdate({ _id: otherUser._id }, { followers: otherUser.followers });
      return res.status(200).json("User followed");
    }
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Block user only for me
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of my user
 * @body {String} username - Username of the user I want to block
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/users/:username
 */
export const blockUser = async (req, res) => {
  try {
    const myUser = await User.findOne({ username: req.params.username }, { username: 1, status: 1, deleted: 1, blockedUsers: 1 });
    const otherUser = await User.findOne({ username: req.body.username }, { _id: 1, username: 1, status: 1, deleted: 1 });
    await verifyUsers(myUser, otherUser);
    if (myUser.blockedUsers.includes(otherUser._id)) return res.status(400).json({ error: "User is blocked" });
    myUser.blockedUsers.push(otherUser._id);
    await User.findOneAndUpdate({ username: myUser.username }, { blockedUsers: myUser.blockedUsers });
    return res.status(200).json("User blocked");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Report user
 * @function reportUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of my user
 * @body {String} username - Username of the user I want to report
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/users/:username
 */
export const reportUser = async (req, res) => {
  try {
    const myUser = await User.findOne({ username: req.params.username }, { username: 1, status: 1, deleted: 1 });
    const otherUser = await User.findOne({ username: req.body.username }, { username: 1, status: 1, deleted: 1 });
    await verifyUsers(myUser, otherUser);
    if (otherUser.status === "reported") return res.status(400).json({ error: "User is reported" });
    otherUser.status = "reported";
    await User.findOneAndUpdate({ username: otherUser.username }, { status: otherUser.status });
    return res.status(200).json("User reported");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}