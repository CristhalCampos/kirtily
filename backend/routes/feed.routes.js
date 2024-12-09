import Router from "express";
import { getFeedPosts, getUserSuggestions, getHighlightedPublications } from "../controllers/feedController.js";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";

/**
 * Feed routes
 */
const router = Router();

/**
 * Get feed publications, user suggestions and highlighted publications
 * @method GET
 */
router.get("/", authorizeRole(["user", "userPremium", "admin"]), async (req, res) => {
  try {
    const feedPublications = await getFeedPosts(req, res);
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

export default router;