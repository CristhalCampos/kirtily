import Router from "express";
import { getFeedPublications, getUserSuggestions, getHighlightedPublications } from "../controllers/feed.controller.js";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";

/**
 * Feed routes
 */
const routerFeed = Router();

/**
 * Get feed publications, user suggestions and highlighted publications
 * @method GET
 */
routerFeed.get("/feed", authorizeRole(["user", "userPremium", "admin"]), async (req, res) => {
  try {
    const feedPublications = await getFeedPublications(req, res);
    const userSuggestions = await getUserSuggestions(req, res);
    const highlightedPublications = await getHighlightedPublications(req, res);
    res.status(200).json({
      feedPublications: feedPublications.data,
      userSuggestions: userSuggestions.data,
      highlightedPublications: highlightedPublications.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default routerFeed;