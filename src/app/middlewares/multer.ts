import multer from "multer";
import path from "path";
import fs from "fs";

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, png, webp allowed"));
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// multiple in same modal upload
// upload.fields([
//   { name: "images", maxCount: 10 },
//   { name: "thumbnail", maxCount: 1 },
// ])
