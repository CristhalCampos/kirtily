import { Router } from "express";
import { getComments, comment, reportComment, deleteCommentMyPublication, deleteCommentAnotherPublication } from "../controllers/comments.controller.js";
import { authenticateToken, authorizeRoles } from "../middlewares/authenticate.middleware.js";

/**
 * Comments routes
 */
const routerComments = Router();

/**
 * Get comments of a publication
 * @method GET
 */
routerComments.get("/publications/:id/comments", authenticateToken, getComments);

/**
 * Create a new comment
 * @method POST
 */
routerComments.post("/publications/:id/comments", authenticateToken, comment);

/**
 * Report a comment
 * @method PATCH
 */
routerComments.patch("/publications/:id/comments/:commentId", authenticateToken, reportComment);

/**
 * Delete a comment
 * @method DELETE
 */
routerComments.delete("/publications/:id/comments/:commentId", authenticateToken, authorizeRoles("userpremium"), deleteCommentMyPublication);

/**
 * Delete a comment
 * @method DELETE
 */
routerComments.delete("/publications/:id/comments/:commentId", authenticateToken, authorizeRoles("userpremium"), deleteCommentAnotherPublication);

export default routerComments;