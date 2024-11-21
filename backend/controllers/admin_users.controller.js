/**
 * Get all users
 * @function getAllUsers
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @query {Number} page - Page number
 * @query {Number} limit - Limit of users
 * @returns {Object} - List of users
 * @method GET
 * @example http://localhost:3001/admin/users?page=1&limit=10
 */
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.paginate({deleted: false}, { page, limit });
    res.status(200).json(users);
  } catch (error) {
    error.name === "ValidationError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Get statistics of users, active users: user, userpremium and admin, blocked users and deleted users
 * @function getStadistics
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Statistics
 * @method GET
 * @example http://localhost:3001/admin/stadistics
 */
export const getStadistics = async (req, res) => {
  try {
    const statistics = await User.aggregate([
      {
        $facet: {
          activeUsers: [
            { $match: { deleted: false, status: "active" } },
            { $group: { _id: "$role", count: { $sum: 1 } } }
          ],
          blockedUsers: [
            { $match: { deleted: false, status: "blocked" } },
            { $count: "count" }
          ],
          deletedUsers: [
            { $match: { deleted: true } },
            { $count: "count" }
          ]
        }
      }
    ]);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Block or unblock user
 * @function blockUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @returns {Object} - Message
 * @method PATCH
 * @example http://localhost:3001/admin/users/:username
 */
export const blockOrUnblockUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.params.username });
    if (!userExists) return res.status(404).json({ error: "User not found" });
    if (userExists.deleted) {
      return res.status(403).json({ error: "User has been deleted" });
    }
    if (userExists.status === "blocked") {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { status: "active" }
      );
      res.status(200).json("User unblocked");
    } else if (userExists.status === "active") {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { status: "blocked" }
      );
      res.status(200).json("User blocked");
    }
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Delete user
 * @function deleteUser
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {String} req.params.username - Username of the user
 * @returns {Object} - Message
 * @method DELETE
 * @example http://localhost:3001/admin/users/:username
 */
export const deleteUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.params.username });
    if (!userExists) return res.status(404).json({ error: "User not found" });
    if (userExists.deleted) return res.status(403).json({ error: "User has been deleted" });
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { deleted: true }
    );
    res.status(200).json("User deleted");
  } catch (error) {
    error.name === "CastError"
      ? res.status(400).json({ error: error.message })
      : res.status(500).json({ error: "Internal server error" });
  }
}