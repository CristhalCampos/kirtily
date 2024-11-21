import { Router} from "express";
import { getAllUsers, blockOrUnblockUser, deleteUser } from "../controllers/admin_users.controller";

/**
 * Admin users routes
 */
const routerAdminUsers = Router();

/**
 * Get all users
 * @method GET
 */
routerAdminUsers.get("/admin/users", getAllUsers);

/**
 * Block or unblock user
 * @method PATCH
 */
routerAdminUsers.patch("/admin/users/:username", blockOrUnblockUser);

/**
 * Delete user
 * @method DELETE
 */
routerAdminUsers.delete("/admin/users/:username", deleteUser);

export default routerAdminUsers;