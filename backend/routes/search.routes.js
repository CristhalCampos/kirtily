import { Router} from "express";
import { searchUser, searchPublication } from "../controllers/search.controller.js";

/**
 * Search routes
 */
const routerSearch = Router();

/**
 * Search user by full name, username, bio or any of interests
 * @method GET
 */
routerSearch.get("/search", searchUser);

/**
 * Search publication by author, hashtags, content or media
 * @method GET
 */
routerSearch.get("/search", searchPublication);

export default routerSearch;