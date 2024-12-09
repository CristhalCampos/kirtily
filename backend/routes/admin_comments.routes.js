import { Router} from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { getAllComments, deleteComment } from "../controllers/admin_comments.controller.js";

/**
 * Admin comments routes
 */
const routerAdminComments = Router();

/**
 * Get all comments
 * @method GET
 */
routerAdminComments.get("/admin/comments", authorizeRole(["admin"]), getAllComments);

/**
 * Delete comment
 * @method DELETE
 */
routerAdminComments.delete("/admin/comments", authorizeRole(["admin"]), deleteComment);

export default routerAdminComments;