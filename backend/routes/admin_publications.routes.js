import { Router} from "express";
import { getAllPublications, deletePublication } from "../controllers/admin_publications.controller";

/**
 * Admin publications routes
 */
const routerAdminPublications = Router();

/**
 * Get all publications
 * @method GET
 */
routerAdminPublications.get("/admin/publications", getAllPublications);

/**
 * Delete publication
 * @method DELETE
 */
routerAdminPublications.delete("/admin/publications/:id", deletePublication);

export default routerAdminPublications;