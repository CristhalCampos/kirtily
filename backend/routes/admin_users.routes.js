import { Router} from "express";
import { getAllUsers, blockOrUnblockUser, deleteUser } from "../controllers/admin_users.controller";
import { authenticateToken } from "../middlewares/authenticateToken.middleware";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware";

/**
 * Admin users routes
 */
const routerAdminUsers = Router();

// Rutas solo para administradores

/**
 * Get all users
 * @method GET
 */
routerAdminUsers.get("/admin/users", authenticateToken, authorizeRoles("admin"), getAllUsers);

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