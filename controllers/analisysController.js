const os = require("os");
const path = require("path");
const fs = require("fs").promises;

const {
  analyzeText,
  createAnalysisResult,
  getAnalysisResultFromDB,
} = require("../services/analysisService");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const uploadsDirectory = process.env.UPLOAD_PATH;


/**
 * Initiates the analysis process for a given file based on the specified operation and options.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with taskId if successful, or error response if failed.
 */
const initiateAnalysis = async (req, res) => {
  try {
    const { fileId, operation, options } = req.body;
    const filename = await prisma.file.findUnique({
      where: {
        fileId: fileId,
      },
      select: {
        filename: true,
      },
    });
    const filePath = path.join(
      __dirname,
      "..",
      uploadsDirectory,
      filename.filename
    );
    const data = await fileData(filePath);
    const result = await analyzeText(data, fileId, operation, options);

    const analysisResult = await createAnalysisResult(
      fileId,
      operation,
      result
    );

    return res.json({ taskId: analysisResult.taskId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
 * Retrieves the analysis result for a specific taskId.
 *
 * @param {Object} req - Express request object with taskId as a parameter.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response with the analysis result or an error response if not found.
 */
const getAnalysisResult = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const result = await getAnalysisResultFromDB(taskId);

    if (!result) {
      return res.status(404).json({ error: "Analysis result not found" });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
 * Reads and returns the content of a file located at the specified filePath.
 *
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>} - A Promise that resolves with the content of the file as a string.
 * @throws {Error} - If there is an error reading the file.
 */
const fileData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

module.exports = { initiateAnalysis, getAnalysisResult };
