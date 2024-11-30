import { Router} from "express";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";
import { searchUser, searchPublication } from "../controllers/search.controller.js";

/**
 * Search routes
 */
const routerSearch = Router();

/**
 * Search user by full name, username, bio or any of interests
 * @method GET
 */
routerSearch.get("/search", authenticateToken, searchUser);

/**
 * Search publication by author, hashtags, content or media
 * @method GET
 */
routerSearch.get("/search", authenticateToken, searchPublication);

export default routerSearch;