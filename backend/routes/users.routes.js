import { Router} from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/authenticate.middleware.js";
import { registerValidation, loginValidation, passwordValidation } from "../middlewares/validation.middleware.js";
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, viewAccount, editPassword, viewMyProfile, editProfile, shareProfile } from "../controllers/users.controller.js";
import { viewUser, followOrUnfollowUser, blockUser, reportUser } from "../controllers/other_user.controller.js";
import { uploadImage } from "../middlewares/uploadImage.middleware.js";

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
routerUsers.post("/register", registerValidation, registerUser);

/**
 * Logout user
 * @method POST
 */
routerUsers.post("/account/:username", authenticateToken, logoutUser);

/**
 * Forgot password
 * @method POST
 */
routerUsers.post("/forgot-password", forgotPassword);

/**
 * Reset password
 * @method POST
 */
routerUsers.post("/reset-password/:resetToken", passwordValidation, resetPassword);

/**
 * View account
 * @method GET
 */
routerUsers.get("/account/:username", authenticateToken, viewAccount);

/**
 * Edit password
 * @method PATCH
 */
routerUsers.patch("/account/edit-password/:username", authenticateToken, passwordValidation, editPassword);

/**
 * View my profile
 * @method GET
 */
//routerUsers.get("/profile/:username", authenticateToken, viewMyProfile);
routerUsers.get("/profile/:username", viewMyProfile);

/**
 * Edit user profile or user account
 * @method PATCH
 */
//routerUsers.patch("/profile/edit/:username", authenticateToken, editProfile);
routerUsers.patch("/profile/edit/:username", uploadImage.single("profilePicture"), editProfile);

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