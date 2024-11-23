import { Router} from "express";
import { createPublication, editPublication, highlightPublication, deletePublication } from "../controllers/publications.controller.js";
import { searchPublication, viewPublication, inspiresMe, recommendIt, wantToContribute, sharePublication, reportPublication } from "../controllers/other.publications.controller";

/**
 * Publications routes
 */
const routerPublications = Router();

/**
 * Create a new publication
 * @method POST
 */
routerPublications.post("/publications", createPublication);

/**
 * Edit a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id", editPublication);

/**
 * Highlight a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id", highlightPublication);

/**
 * Delete a publication
 * @method DELETE
 */
routerPublications.delete("/publications/:id", deletePublication);

/**
 * Search publication by author, hashtags, content or media
 * @method GET
 */
routerPublications.get("/publications/search", searchPublication);

/**
 * View a publication
 * @method GET
 */
routerPublications.get("/publications/:id", viewPublication);

/**
 * Inspires me" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/inspiresMe", inspiresMe);

/**
 * Recommend it" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/recommendIt", recommendIt);

/**
 * Want to contribute" reaction to a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/wantToContribute", wantToContribute);

/**
 * Share publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/share", sharePublication);

/**
 * Report a publication
 * @method PATCH
 */
routerPublications.patch("/publications/:id/report", reportPublication);

export default routerPublications