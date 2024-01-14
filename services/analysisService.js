const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Analyzes the given text based on the specified operation and options.
 *
 * @param {string} data - The text data to analyze.
 * @param {string} fileId - The unique identifier of the file being analyzed.
 * @param {string} operation - The analysis operation to perform.
 * @param {Object} options - Options specific to the chosen analysis operation.
 * @returns {Promise<any>} - A Promise that resolves with the analysis result.
 * @throws {Error} - If an invalid analysis operation is provided.
 */
const analyzeText = async (data, fileId, operation, options) => {
  switch (operation) {
    case "countWords":
      return countWords(data);
    case "countUniqueWords":
      return countUniqueWords(data);
    case "findTopKWords":
      return findTopKWords(data, options);
    default:
      throw new Error("Invalid analysis operation");
  }
};

/**
 * Counts the number of words in the given text.
 *
 * @param {string} text - The text for word counting.
 * @returns {string} - The count of words as a string.
 */

const countWords = (text) => {
  return text.split(/\s+/).length.toString();
};

/**
 * Counts the number of unique words in the given text.
 *
 * @param {string} text - The text for unique word counting.
 * @returns {string} - The count of unique words as a string.
 */

const countUniqueWords = (text) => {
  const words = text.split(/\s+/);
  const uniqueWords = new Set(words);
  return uniqueWords.size.toString();
};

/**
 * Finds the top K words with their counts in the given text.
 *
 * @param {string} text - The text for finding top K words.
 * @param {number} k - The number of top words to retrieve.
 * @returns {Array<Object>} - An array of objects containing word and count properties.
 */

const findTopKWords = (text, k) => {
  const words = text.match(/\b\w+\b/g);

  if (!words) {
    return [];
  }

  const wordCountMap = words.reduce((countMap, word) => {
    const lowercasedWord = word.toLowerCase();
    countMap[lowercasedWord] = (countMap[lowercasedWord] || 0) + 1;
    return countMap;
  }, {});
  const resultArray = [];
  for (const word in wordCountMap) {
    if (wordCountMap.hasOwnProperty(word)) {
      resultArray.push({ word, count: wordCountMap[word] });
    }
  }

  resultArray.sort((a, b) => {
    if (b.count - a.count !== 0) {
      return b.count - a.count;
    }
    return a.word.localeCompare(b.word);
  });

  const topWords = resultArray.slice(0, k);
  return topWords;
};

/**
 * Creates a record in the database for the analysis result.
 *
 * @param {string} fileId - The unique identifier of the file being analyzed.
 * @param {string} operation - The analysis operation performed.
 * @param {any} result - The result of the analysis.
 * @returns {Promise<any>} - A Promise that resolves with the created analysis result.
 */

const createAnalysisResult = async (fileId, operation, result) => {
  const analysisResult = await prisma.analysisResult.create({
    data: {
      taskId: generateUniqueTaskId(),
      fileId: fileId,
      operation: operation,
      result: result,
    },
  });

  return analysisResult;
};

/**
 * Retrieves the analysis result from the database based on the taskId.
 *
 * @param {string} taskId - The unique identifier of the analysis task.
 * @returns {Promise<any>} - A Promise that resolves with the analysis result or null if not found.
 */

const getAnalysisResultFromDB = async (taskId) => {
  const result = await prisma.analysisResult.findUnique({
    where: {
      taskId: taskId,
    },
  });

  return result;
};

/**
 * Generates a unique task identifier.
 *
 * @returns {string} - The generated unique task identifier.
 */

const generateUniqueTaskId = () => {
  return new Date().getTime().toString();
};

module.exports = { analyzeText, createAnalysisResult, getAnalysisResultFromDB };
