import { Router} from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/authenticate.middleware.js";
import { getAllPublications, deletePublication } from "../controllers/admin_publications.controller.js";

/**
 * Admin publications routes
 */
const routerAdminPublications = Router();

/**
 * Get all publications
 * @method GET
 */
routerAdminPublications.get("/admin/publications", authenticateToken, authorizeRoles("admin"), getAllPublications);

/**
 * Delete publication
 * @method DELETE
 */
routerAdminPublications.delete("/admin/publications/:id", authenticateToken, authorizeRoles("admin"), deletePublication);

export default routerAdminPublications;