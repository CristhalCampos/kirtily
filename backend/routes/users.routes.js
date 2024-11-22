import { Router} from "express";
import { getUser, searchUser, editUser } from "../controllers/users.controller.js";

/**
 * Users routes
 */
const routerUsers = Router();

/**
 * Get user by username
 * @method GET
 */
routerUsers.get("users/:username", getUser);

/**
 * Search user by full name, username, bio, or any of interests
 * @method GET
 */
routerUsers.get("/search", searchUser);

/**
 * Edit user profile or user account
 * @method PATCH
 */
routerUsers.patch("/users/:username", editUser);

export default routerUsers;