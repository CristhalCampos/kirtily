import { Router} from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { searchUser, searchPublication } from "../controllers/search.controller.js";

/**
 * Search routes
 */
const routerSearch = Router();

/**
 * Search user and publication
 * @method GET
 */
routerSearch.get("/search", authorizeRole(["user", "userPremium", "admin"]), async (req, res) => {
  try {
    const searchUser = await searchUser(req, res);
    const searchPublication = await searchPublication(req, res);
    res.status(200).json({
      searchUser: searchUser.data,
      searchPublication: searchPublication.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerSearch;