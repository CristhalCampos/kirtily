import { Router} from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { dynamicUploadMedia } from "../middlewares/dynamicUpload.middleware.js";
import { createPublication, editPublication, createHighlightPublication, deletePublication } from "../controllers/publications.controller.js";
import { viewPublication, inspiresMe, recommendIt, wantToContribute, sharePublication, reportPublication } from "../controllers/other.publications.controller.js";

/**
 * Publications routes
 */
const routerPublications = Router();

/**
 * Create a new publication
 * @method POST
 */
routerPublications.post("/publications/create", dynamicUploadMedia, createPublication);

/**
 * Edit a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id", dynamicUploadMedia, editPublication);

/**
 * Highlight a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id", authorizeRole(["userPremium", "admin"]), createHighlightPublication);

/**
 * Delete a publication
 * @method DELETE
 */
routerPublications.delete("/publications/:id", authorizeRole(["user", "userPremium", "admin"]), deletePublication);

/**
 * View a publication
 * @method GET
 */
routerPublications.get("/publications/:id", authorizeRole(["user", "userPremium", "admin"]), viewPublication);

/**
 * Inspires me" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/inspiresMe", authorizeRole(["user", "userPremium", "admin"]), inspiresMe);

/**
 * Recommend it" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/recommendIt", authorizeRole(["user", "userPremium", "admin"]), recommendIt);

/**
 * Want to contribute" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/wantToContribute", authorizeRole(["user", "userPremium", "admin"]), wantToContribute);

/**
 * Share publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/share", authorizeRole(["user", "userPremium", "admin"]), sharePublication);

/**
 * Report a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/report", authorizeRole(["user", "userPremium", "admin"]), reportPublication);

export default routerPublications