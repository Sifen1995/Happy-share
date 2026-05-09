const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // Video uploads take longer; avoid aggressive default timeouts.
  timeout: Number.parseInt(process.env.CLOUDINARY_TIMEOUT_MS || "180000", 10),
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "happyshare/posts",
    resource_type: "auto",
  },
});

const upload = multer({
  storage,
  limits: {
    // Allow larger uploads for short videos (~100MB).
    fileSize: Number.parseInt(process.env.MAX_UPLOAD_BYTES || "104857600", 10),
  },
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype &&
      (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/"))
    ) {
      return cb(null, true);
    }
    return cb(new Error("Only image and video uploads are allowed"));
  },
});

module.exports = upload;
