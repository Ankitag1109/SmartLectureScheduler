// // server/middleware/upload.js

// const multer = require("multer");
// const path = require("path");

// // Set storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Folder to save uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Generate unique filename: timestamp + original name
//     cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
//   },
// });

// // File type check
// const fileFilter = (req, file, cb) => {
//   const filetypes = /mp4|mov|avi|mkv/; // Allowed video formats
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only video files are allowed (mp4, mov, avi, mkv)"));
//   }
// };

// // Initialize upload
// const upload = multer({
//   storage,
//   limits: { fileSize: 500 * 1024 * 1024 }, // Max 500MB
//   fileFilter,
// });

// module.exports = upload;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
