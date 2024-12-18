import { Router} from "express";
import { authorizeRole } from "../middlewares/authenticate.middleware.js";
import { registerValidation, loginValidation, forgotValidation, resetValidation, editValidation } from "../middlewares/validations.middleware.js";
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, viewAccount, editPassword, viewMyProfile, editProfile, shareProfile } from "../controllers/users.controller.js";
import { viewUser, followOrUnfollowUser, blockUser, reportUser } from "../controllers/other_user.controller.js";
import { dynamicUpload } from "../middlewares/dynamicUpload.middleware.js";
import { refreshToken } from "../middlewares/tokens.middleware.js";

/**
 * Users routes
 */
const routerUsers = Router();

/**
 * Login user
 * @method POST
 */
routerUsers.post("/login", loginValidation, loginUser);

routerUsers.post("/refresh-token", refreshToken);

/**
 * Register user
 * @method POST
 */
routerUsers.post("/register", registerValidation, registerUser);

/**
 * Logout user
 * @method POST
 */
routerUsers.post("/account/:username", authorizeRole(["user", "userPremium", "admin"]), logoutUser);

/**
 * Forgot password
 * @method POST
 */
routerUsers.post("/forgot-password", forgotValidation, forgotPassword);

/**
 * Reset password
 * @method POST
 */
routerUsers.post("/reset-password/:resetToken", resetValidation, resetPassword);

/**
 * View account
 * @method GET
 */
routerUsers.get("/account/:username", authorizeRole(["user", "userPremium", "admin"]), viewAccount);

/**
 * Edit password
 * @method PATCH
 */
routerUsers.patch("/account/edit-password/:username", authorizeRole(["user", "userPremium", "admin"]), editValidation, editPassword);

/**
 * View my profile
 * @method GET
 */
routerUsers.get("/profile/:username", authorizeRole(["user", "userPremium", "admin"]), viewMyProfile);

/**
 * Edit user profile
 * @method PATCH
 */
routerUsers.patch("/profile/edit/:username", dynamicUpload, editProfile);

/**
 * Share profile
 * @method GET
 */
routerUsers.get("/profile/:username", authorizeRole(["user", "userPremium", "admin"]), shareProfile);

/**
 * View user profile
 * @method GET
 */
routerUsers.get("/profile/:other-username", authorizeRole(["user", "userPremium", "admin"]), viewUser);

/**
 * Follow or unfollow user
 * @method PATCH
 */
routerUsers.patch("/profile/:other-username", authorizeRole(["user", "userPremium", "admin"]), followOrUnfollowUser);

/**
 * Block or unblock user
 * @method PATCH
 */
routerUsers.patch("/profile/:other-username", authorizeRole(["user", "userPremium", "admin"]), blockUser);

/**
 * Report User
 * @method PATCH
 */
routerUsers.patch("/profile/:other-username", authorizeRole(["user", "userPremium", "admin"]), reportUser);

export default routerUsers;