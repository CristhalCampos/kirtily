import { Router} from "express";
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js";
import { registerUser, loginUser, logoutUser, editUser, shareProfile } from "../controllers/users.controller.js";
import {viewUser, followOrUnfollowUser, blockUser, reportUser } from "../controllers/other_user.controller.js";

/**
 * Users routes
 */
const routerUsers = Router();

/**
 * Register user
 * @method POST
 */
routerUsers.post("/register", registerUser);

/**
 * Login user
 * @method POST
 */
routerUsers.post("/login", loginUser);

/**
 * Logout user
 * @method POST
 */
routerUsers.post("/:username", authenticateToken, logoutUser);

/**
 * Edit user profile or user account
 * @method PATCH
 */
routerUsers.patch("/:username", authenticateToken, editUser);

/**
 * Share profile
 * @method GET
 */
routerUsers.get("/:username", authenticateToken, shareProfile);

/**
 * View user profile
 * @method GET
 */
routerUsers.get("/:username", authenticateToken, viewUser);

/**
 * Follow or unfollow user
 * @method PATCH
 */
routerUsers.patch("/:username", authenticateToken, followOrUnfollowUser);

/**
 * Block or unblock user
 * @method PATCH
 */
routerUsers.patch("/:username", authenticateToken, blockUser);

/**
 * Report User
 * @method PATCH
 */
routerUsers.patch("/:username", authenticateToken, reportUser);

export default routerUsers;