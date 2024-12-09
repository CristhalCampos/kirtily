import { Router} from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { getAllPublications, deletePublication } from "../controllers/admin_publications.controller.js";

/**
 * Admin publications routes
 */
const routerAdminPublications = Router();

/**
 * Get all publications
 * @method GET
 */
routerAdminPublications.get("/admin/publications", authorizeRole(["admin"]), getAllPublications);

/**
 * Delete publication
 * @method DELETE
 */
routerAdminPublications.delete("/admin/publications", authorizeRole(["admin"]), deletePublication);

export default routerAdminPublications;