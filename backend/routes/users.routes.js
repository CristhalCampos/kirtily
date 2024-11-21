import { Router} from "express";
import { getUser, searchUser, createUser, editUser } from "../controllers/users.controller.js";

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
 * Create user
 * @method POST
 */
routerUsers.post("/users", createUser);

/**
 * Edit user profile or user account
 * @method PATCH
 */
routerUsers.patch("/users/:username", editUser);

export default routerUsers;