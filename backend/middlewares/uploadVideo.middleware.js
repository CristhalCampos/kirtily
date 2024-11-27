import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/videos"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)"), false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 50,
};

export const uploadVideo = multer({ storage, fileFilter, limits});

const storageForPremium = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/videos"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
  },
});

const limitsForPremium = {
  fileSize: 1024 * 1024 * 120,
};

export const uploadVideoPremium = multer({ storageForPremium, fileFilter, limitsForPremium});