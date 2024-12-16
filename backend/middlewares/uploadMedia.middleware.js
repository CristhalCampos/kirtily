import multer from "multer";
import path from "path";

/**
 * @description Middleware for uploading media
 * @function uploadMedia
 */
export const uploadMedia = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, path.resolve("public/images"));
      } else if (file.mimetype.startsWith("video/")) {
        cb(null, path.resolve("public/videos"));
      } else {
        cb(new Error("Only image and video files are allowed"), false);
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      ["image/jpg", "image/jpeg", "image/webp", "video/mp4"].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  limits: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, { fileSize: 1024 * 1024 * 20 });
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, { fileSize: 1024 * 1024 * 50 });
    }
  }
}).array("media", 5);

/**
 * @description Middleware for uploading premium media
 * @function uploadMediaPremium
 */
export const uploadMediaPremium = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, path.resolve("public/images"));
      } else if (file.mimetype.startsWith("video/")) {
        cb(null, path.resolve("public/videos"));
      } else {
        cb(new Error("Only image and video files are allowed"), false);
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      ["image/jpg", "image/jpeg", "image/webp", "image/gif", "video/mp4"].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  limits: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, { fileSize: 1024 * 1024 * 40 });
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, { fileSize: 1024 * 1024 * 120 });
    }
  }
}).array("media", 5);