import { Router} from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/authenticate.middleware.js";
import { createPublication, editPublication, createFeaturedPublication, deletePublication } from "../controllers/publications.controller.js";
import { viewPublication, inspiresMe, recommendIt, wantToContribute, sharePublication, reportPublication } from "../controllers/other.publications.controller.js";

/**
 * Publications routes
 */
const routerPublications = Router();

/**
 * Create a new publication
 * @method POST
 */
routerPublications.post("/publications", authenticateToken, createPublication);

/**
 * Edit a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id", authenticateToken, editPublication);

/**
 * Highlight a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id", authenticateToken, authorizeRoles("userpremium"), createFeaturedPublication);

/**
 * Delete a publication
 * @method DELETE
 */
routerPublications.delete("/publications/:id", authenticateToken, deletePublication);

/**
 * View a publication
 * @method GET
 */
routerPublications.get("/publications/:id", authenticateToken, viewPublication);

/**
 * Inspires me" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/inspiresMe", authenticateToken, inspiresMe);

/**
 * Recommend it" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/recommendIt", authenticateToken, recommendIt);

/**
 * Want to contribute" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/wantToContribute", authenticateToken, wantToContribute);

/**
 * Share publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/share", authenticateToken, sharePublication);

/**
 * Report a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/report", authenticateToken, reportPublication);

export default routerPublications