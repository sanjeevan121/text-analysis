const express = require("express");
const { uploadFile } = require("../controllers/uploadController");
const router = express.Router();

module.exports = (upload) => {
  router.post("/", upload.single("file"), uploadFile);
  return router;
};
