import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)"), false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 20,
};

export const uploadImage = multer({ storage, fileFilter, limits});

const storageForPremium = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
  },
});

const fileFilterForPremium = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)"), false);
  }
};

const limitsForPremium = {
  fileSize: 1024 * 1024 * 40,
};

export const uploadImagePremium = multer({storageForPremium, fileFilterForPremium, limitsForPremium});