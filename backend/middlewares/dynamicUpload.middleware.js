import { authorizeRole } from "./authenticate.middleware.js";
import { uploadImage, uploadImagePremium } from "./uploadPictureProfile.middleware.js";
import { uploadMedia, uploadMediaPremium } from "./uploadMedia.middleware.js";

/**
 * @description Middleware for dynamic upload profile picture
 * @function dynamicUpload
 */
export const dynamicUpload = (req, res, next) => {
  if (authorizeRole(["user"])(req, res, () => {})) {
    return uploadImage(req, res, next);
  } else if (authorizeRole(["userpremium", "admin"])(req, res, () => {})) {
    return uploadImagePremium(req, res, next);
  } else {
    return res.status(403).json({ error: "Unauthorized role" });
  }
};

/**
 * @description Middleware for dynamic upload media
 * @function dynamicUploadMedia
 */
export const dynamicUploadMedia = (req, res, next) => {
  if (authorizeRole(["user"])(req, res, () => {})) {
    return uploadMedia(req, res, next);
  } else if (authorizeRole(["userpremium", "admin"])(req, res, () => {})) {
    return uploadMediaPremium(req, res, next);
  } else {
    return res.status(403).json({ error: "Unauthorized role" });
  }
};