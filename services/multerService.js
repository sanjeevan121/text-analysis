require("dotenv").config();
const fs = require("fs");
const multer = require("multer");

/**
 * Multer setup for handling file uploads.
 *
 * @module multerSetup
 * @type {Object}
 * @property {Object} storage - Multer storage configuration.
 * @property {Function} storage.destination - Function to determine the destination directory for uploaded files.
 * @property {Function} storage.filename - Function to determine the filename for uploaded files.
 * @property {Function} fileFilter - Function to filter uploaded files based on their MIME type.
 * @property {Object} limits - Limits configuration for file size and count.
 * @property {number} limits.fileSize - Maximum allowed file size in bytes.
 * @property {number} limits.files - Maximum allowed number of files.
 * @property {Object} upload - Multer instance configured with the specified storage, file filter, and limits.
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(process.env.UPLOAD_PATH, { recursive: true });
    cb(null, process.env.UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "text") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5000000, files: 1 },
});

module.exports = upload;
