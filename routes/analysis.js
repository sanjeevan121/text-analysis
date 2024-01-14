const express = require("express");
const {
  initiateAnalysis,
  getAnalysisResult,
} = require("../controllers/analisysController");
const router = express.Router();

router.post("/", initiateAnalysis);
router.get("/:taskId", getAnalysisResult);

module.exports = router;
