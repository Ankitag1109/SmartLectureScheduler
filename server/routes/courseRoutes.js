const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addCourse, getCourses } = require("../controllers/courseController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), addCourse);
router.get("/", getCourses);

module.exports = router;
