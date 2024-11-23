import { Router} from "express";
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
routerUsers.post("/users", registerUser);

/**
 * Login user
 * @method POST
 */
routerUsers.post("/users/login", loginUser);

/**
 * Logout user
 * @method POST
 */
routerUsers.post("/users/logout", logoutUser);

/**
 * Edit user profile or user account
 * @method PATCH
 */
routerUsers.patch("/users/:username", editUser);

/**
 * Share profile
 * @method GET
 */
routerUsers.get("/users/:username", shareProfile);

/**
 * View user profile
 * @method GET
 */
routerUsers.get("/users/:username", viewUser);

/**
 * Follow or unfollow user
 * @method PATCH
 */
routerUsers.patch("/users/:username", followOrUnfollowUser);

/**
 * Block or unblock user
 * @method PATCH
 */
routerUsers.patch("/users/:username", blockUser);

/**
 * Report User
 * @method PATCH
 */
routerUsers.patch("/users/:username", reportUser);

export default routerUsers;