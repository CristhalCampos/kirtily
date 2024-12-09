import { Router} from "express";
import { getAllUsers, createUser, editUser, blockOrUnblockUser, deleteUser } from "../controllers/admin_users.controller.js";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { createUserValidation, editUserValidation } from "../middlewares/validations.middleware.js";

/**
 * Admin users routes
 */
const routerAdminUsers = Router();

/**
 * Get all users
 * @method GET
 */
routerAdminUsers.get("/admin/users", authorizeRole(["admin"]), getAllUsers);

/**
 * Create a new user
 * @method POST
 */
routerAdminUsers.post("/admin/users/create", authorizeRole(["admin"]), createUserValidation, createUser);

/**
 * Edit a user
 * @method PATCH
 */
routerAdminUsers.patch("/admin/users/edit", authorizeRole(["admin"]), editUserValidation, editUser);

/**
 * Block or unblock user
 * @method PATCH
 */
routerAdminUsers.patch("/admin/users", authorizeRole(["admin"]), blockOrUnblockUser);

/**
 * Delete user
 * @method DELETE
 */
routerAdminUsers.delete("/admin/users", authorizeRole(["admin"]), deleteUser);

export default routerAdminUsers;