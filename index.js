const express = require("express");
const uploadRouter = require("./routes/upload");
const analysisRouter = require("./routes/analysis");
const multerService=require("./services/multerService")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/upload", uploadRouter(multerService));
app.use("/analysis", analysisRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const uploadMulter = multer({
//   limits: { fileSize: MULTER_UPLOAD_FILE_MAX_SIZE },
//   storage,
//   fileFilter: function (req, file, callback) {
//     const ext = path.extname(file.originalname);
//     if (!MULTER_ALLOWED_FILE_EXTENSIONS.includes(ext.replace(".", ""))) {
//       return callback(new Error("Only images are allowed"));
//     }
//     callback(null, true, ext);
//   },
// });