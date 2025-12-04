// // // // // // // // const express = require("express");
// // // // // // // // const router = express.Router();
// // // // // // // // const {
// // // // // // // //   createCourse,
// // // // // // // //   getAllCourses,
// // // // // // // //   getCourseById,
// // // // // // // //   updateCourse,
// // // // // // // //   deleteCourse,
// // // // // // // // } = require("../controllers/courseController");

// // // // // // // // const { adminAuthMiddleware } = require("../middleware/authMiddleware");

// // // // // // // // // Create course
// // // // // // // // router.post("/", adminAuthMiddleware, createCourse);

// // // // // // // // // Get all courses
// // // // // // // // router.get("/", adminAuthMiddleware, getAllCourses);

// // // // // // // // // Get single course by ID
// // // // // // // // router.get("/:id", adminAuthMiddleware, getCourseById);

// // // // // // // // // Update course
// // // // // // // // router.put("/:id", adminAuthMiddleware, updateCourse);

// // // // // // // // // Delete course
// // // // // // // // router.delete("/:id", adminAuthMiddleware, deleteCourse);

// // // // // // // // module.exports = router;
// // // // // // // // server/routes/courseRoutes.js
// // // // // // // const express = require("express");
// // // // // // // const router = express.Router();
// // // // // // // const {
// // // // // // //   addCourse,
// // // // // // //   getCourses,
// // // // // // //   addLecture,
// // // // // // // } = require("../controllers/courseController");

// // // // // // // // Add new course
// // // // // // // router.post("/", addCourse);

// // // // // // // // Get all courses
// // // // // // // router.get("/", getCourses);

// // // // // // // // Add lecture (assign instructor + date)
// // // // // // // router.post("/:courseId/lectures", addLecture);

// // // // // // // module.exports = router;
// // // // // // // server/routes/courseRoutes.js
// // // // // // const express = require("express");
// // // // // // const router = express.Router();
// // // // // // const multer = require("multer");
// // // // // // const { addCourse, getCourses } = require("../controllers/courseController");

// // // // // // // Multer setup for image upload
// // // // // // const storage = multer.diskStorage({
// // // // // //   destination: function (req, file, cb) {
// // // // // //     cb(null, "uploads/"); // make sure this folder exists
// // // // // //   },
// // // // // //   filename: function (req, file, cb) {
// // // // // //     cb(null, Date.now() + "-" + file.originalname);
// // // // // //   },
// // // // // // });
// // // // // // const upload = multer({ storage });

// // // // // // router.post("/", upload.single("image"), addCourse);
// // // // // // router.get("/", getCourses);

// // // // // // module.exports = router;
// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const courseController = require("../controllers/courseController");

// // // // // router.post(
// // // // //   "/",
// // // // //   courseController.upload.single("image"),
// // // // //   courseController.addCourse
// // // // // );
// // // // // router.get("/", courseController.getCourses);
// // // // // router.delete("/:id", courseController.deleteCourse);

// // // // // module.exports = router;
// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const multer = require("multer");
// // // // const {
// // // //   addCourse,
// // // //   getCourses,
// // // //   deleteCourse,
// // // //   assignLecture,
// // // // } = require("../controllers/courseController");

// // // // const storage = multer.diskStorage({
// // // //   destination: function (req, file, cb) {
// // // //     cb(null, "uploads/");
// // // //   },
// // // //   filename: function (req, file, cb) {
// // // //     cb(null, Date.now() + "-" + file.originalname);
// // // //   },
// // // // });

// // // // const upload = multer({ storage });

// // // // router.post("/", upload.single("image"), addCourse);

// // // // // Get all courses
// // // // router.get("/", getCourses);

// // // // // Delete course
// // // // router.delete("/:id", deleteCourse);

// // // // // Assign lecture to instructor
// // // // router.post("/:courseId/lectures", assignLecture);

// // // // module.exports = router;
// // // // server/routes/courseRoutes.js
// // // const express = require("express");
// // // const router = express.Router();
// // // const multer = require("multer");
// // // const {
// // //   addCourse,
// // //   getCourses,
// // //   deleteCourse,
// // //   assignLecture,
// // // } = require("../controllers/courseController");

// // // // Ensure 'uploads/' folder exists in server root

// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, "uploads/"); // folder to store images
// // //   },
// // //   filename: function (req, file, cb) {
// // //     cb(null, Date.now() + "-" + file.originalname);
// // //   },
// // // });

// // // const upload = multer({ storage });

// // // // Add course with image upload
// // // router.post("/", upload.single("image"), addCourse);

// // // // Get all courses
// // // router.get("/", getCourses);

// // // // Delete course
// // // router.delete("/:id", deleteCourse);

// // // // Assign lecture
// // // router.post("/:courseId/lectures", assignLecture);

// // // module.exports = router;
// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const {
// //   addCourse,
// //   getCourses,
// //   deleteCourse,
// // } = require("../controllers/courseController");

// // // Multer setup
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/"); // Make sure this folder exists
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   },
// // });
// // const upload = multer({ storage });

// // // Routes
// // router.post("/", upload.single("image"), addCourse);
// // router.get("/", getCourses);
// // router.delete("/:id", deleteCourse);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const {
//   addCourse,
//   getCourses,
//   deleteCourse,
//   assignLecture,
// } = require("../controllers/courseController");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/", upload.single("image"), addCourse);
// router.get("/", getCourses);
// router.delete("/:id", deleteCourse);
// router.post("/:courseId/lectures", assignLecture);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addCourse, getCourses } = require("../controllers/courseController");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), addCourse);
router.get("/", getCourses);

module.exports = router;
