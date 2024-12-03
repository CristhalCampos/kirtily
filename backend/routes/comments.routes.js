import { Router } from "express";
import { getComments, comment, reportComment, deleteCommentMyPublication, deleteCommentAnotherPublication } from "../controllers/comments.controller.js";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";

/**
 * Comments routes
 */
const routerComments = Router();

/**
 * Get comments of a publication
 * @method GET
 */
routerComments.get("/publications/:id/comments", authorizeRole(["user", "userPremium", "admin"]), getComments);

/**
 * Create a new comment
 * @method POST
 */
routerComments.post("/publications/:id/comments", authorizeRole(["user", "userPremium", "admin"]), comment);

/**
 * Report a comment
 * @method PATCH
 */
routerComments.patch("/publications/:id/comments/:commentId", authorizeRole(["user", "userPremium", "admin"]), reportComment);

/**
 * Delete a comment from my publication
 * @method DELETE
 */
routerComments.delete("/publications/:id/comments/:commentId", authorizeRole(["userPremium", "admin"]), deleteCommentMyPublication);

/**
 * Delete a comment from another publication
 * @method DELETE
 */
routerComments.delete("/publications/:id/comments/:commentId", authorizeRole(["userPremium", "admin"]), deleteCommentAnotherPublication);

export default routerComments;