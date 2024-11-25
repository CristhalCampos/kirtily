import { Router} from "express";
import { getAllUsers, createUser, editUser, blockOrUnblockUser, deleteUser } from "../controllers/admin_users.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/authenticate.middleware.js";

/**
 * Admin users routes
 */
const routerAdminUsers = Router();

/**
 * Get all users
 * @method GET
 */
routerAdminUsers.get("/admin/users", authenticateToken, authorizeRoles("admin"), getAllUsers);

/**
 * Create a new user
 * @method POST
 */
routerAdminUsers.post("/admin/users", authenticateToken, authorizeRoles("admin"), createUser);

/**
 * Edit a user
 * @method PATCH
 */
routerAdminUsers.patch("/admin/users", authenticateToken, authorizeRoles("admin"), editUser);

/**
 * Block or unblock user
 * @method PATCH
 */
routerAdminUsers.patch("/admin/users", authenticateToken, authorizeRoles("admin"), blockOrUnblockUser);

/**
 * Delete user
 * @method DELETE
 */
routerAdminUsers.delete("/admin/users", authenticateToken, authorizeRoles("admin"), deleteUser);

export default routerAdminUsers;