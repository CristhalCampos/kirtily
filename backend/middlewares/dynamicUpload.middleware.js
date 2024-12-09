import { authorizeRole } from "./authenticate.middleware.js";
import { uploadImage, uploadImagePremium } from "./uploadPictureProfile.middleware.js";
import { uploadMedia, uploadMediaPremium } from "./uploadMedia.middleware.js";

export const dynamicUpload = (req, res, next) => {
  if (authorizeRole(["user"])(req, res, () => {})) {
    return uploadImage(req, res, next);
  } else if (authorizeRole(["userpremium"])(req, res, () => {})) {
    return uploadImagePremium(req, res, next);
  } else {
    return res.status(403).json({ error: "Unauthorized role" });
  }
};

export const dynamicUploadMedia = (req, res, next) => {
  if (authorizeRole(["user"])(req, res, () => {})) {
    return uploadMedia(req, res, next);
  } else if (authorizeRole(["userpremium"])(req, res, () => {})) {
    return uploadMediaPremium(req, res, next);
  } else {
    return res.status(403).json({ error: "Unauthorized role" });
  }
};