import { Router} from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/authenticate.middleware.js";
import { getAllComments, deleteComment } from "../controllers/admin_comments.controller.js";

/**
 * Admin comments routes
 */
const routerAdminComments = Router();

/**
 * Get all comments
 * @method GET
 */
routerAdminComments.get("/admin/comments", authenticateToken, authorizeRoles("admin"), getAllComments);

/**
 * Delete comment
 * @method DELETE
 */
routerAdminComments.delete("/admin/comments/:id", authenticateToken, authorizeRoles("admin"), deleteComment);

export default routerAdminComments;