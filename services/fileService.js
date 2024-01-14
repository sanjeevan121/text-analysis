// services/fileService.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Creates a record in the database for the uploaded file.
 *
 * @param {string} filename - The name of the uploaded file.
 * @returns {Promise<any>} - A Promise that resolves with the created file record.
 */

const createFile = async (filename) => {
  const file = await prisma.file.create({
    data: {
      fileId: generateUniqueFileId(),
      filename: filename,
    },
  });

  return file;
};

/**
 * Generates a unique file identifier.
 *
 * @returns {string} - The generated unique file identifier.
 */

const generateUniqueFileId = () => {
  return new Date().getTime().toString();
};

module.exports = { createFile };
