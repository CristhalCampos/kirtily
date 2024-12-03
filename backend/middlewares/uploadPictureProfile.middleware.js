import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed (jpg, jpeg, webp)"), false);
};

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 1024 * 1024 * 20 },
});

const premiumImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "_")}`);
  },
});

export const uploadImagePremium = multer({
  storage: premiumImageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 1024 * 1024 * 40 },
});
