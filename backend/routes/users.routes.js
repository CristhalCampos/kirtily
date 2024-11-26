import { Router} from "express";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";
import { registerValidation, loginValidation } from "../middlewares/validation.middleware.js";
import { encryptPassword, comparePassword } from "../middlewares/bcrypt.middleware.js";
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, editPassword, viewMyProfile, editProfile, shareProfile } from "../controllers/users.controller.js";
import { viewUser, followOrUnfollowUser, blockUser, reportUser } from "../controllers/other_user.controller.js";

/**
 * Users routes
 */
const routerUsers = Router();

/**
 * Login user
 * @method POST
 */
routerUsers.post("/", loginValidation, loginUser);

/**
 * Register user
 * @method POST
 */
routerUsers.post("/register", registerValidation, encryptPassword, registerUser);

/**
 * Logout user
 * @method POST
 */
routerUsers.post("/:username", authenticateToken, logoutUser);

/**
 * Forgot password
 * @method POST
 */
routerUsers.post("/forgot-password", forgotPassword);

/**
 * Reset password
 * @method POST
 */
routerUsers.post("/reset-password/:resetToken", resetPassword);

/**
 * Edit password
 * @method PATCH
 */
routerUsers.patch("/edit-password/:username", authenticateToken, editPassword);

/**
 * View my profile
 * @method GET
 */
routerUsers.get("/profile/:username", authenticateToken, viewMyProfile);

/**
 * Edit user profile or user account
 * @method PATCH
 */
routerUsers.patch("/profile/:username/edit", authenticateToken, editProfile);

/**
 * Share profile
 * @method GET
 */
routerUsers.get("/profile/:username", authenticateToken, shareProfile);

/**
 * View user profile
 * @method GET
 */
routerUsers.get("/profile/:other-username", authenticateToken, viewUser);

/**
 * Follow or unfollow user
 * @method PATCH
 */
routerUsers.patch("/profile/:other-username", authenticateToken, followOrUnfollowUser);

/**
 * Block or unblock user
 * @method PATCH
 */
routerUsers.patch("/profile/:other-username", authenticateToken, blockUser);

/**
 * Report User
 * @method PATCH
 */
routerUsers.patch("/profile/:other-username", authenticateToken, reportUser);

export default routerUsers;