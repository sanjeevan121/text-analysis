const { createFile } = require("../services/fileService");

/**
 * Handles the upload of a file, creates a corresponding record in the database, and returns the fileId.
 *
 * @param {Object} req - Express request object containing the uploaded file information.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the fileId if successful, or an error response if failed.
 */
const uploadFile = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const file = await createFile(originalname);

    return res.json({ fileId: file.fileId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { uploadFile};
