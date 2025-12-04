const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");

// ----------------------------
// TEST ROUTE
// ----------------------------
router.get("/", (req, res) => {
  res.json({ message: "Admin API running" });
});

// ----------------------------
// LOGIN
// ----------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Admin not found" });

  if (admin.password !== password)
    return res.status(401).json({ message: "Invalid password" });

  res.json({ message: "Login successful", admin, token: "admin-dummy-token" });
});

// ----------------------------
// INSTRUCTORS
// ----------------------------
router.post("/instructors", async (req, res) => {
  try {
    const newInstructor = await Instructor.create(req.body);
    res.json(newInstructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/instructors", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// COURSES
// ----------------------------
router.post("/courses", async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructorId", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// LECTURES
// ----------------------------
router.post("/lectures", async (req, res) => {
  try {
    const newLecture = await Lecture.create(req.body);
    res.json(newLecture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/lectures", async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("courseId", "title")
      .populate("instructorId", "name");
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// DASHBOARD STATS
// ----------------------------
router.get("/dashboard", async (req, res) => {
  try {
    const admins = await Admin.countDocuments();
    const instructors = await Instructor.countDocuments();
    const courses = await Course.countDocuments();
    const lectures = await Lecture.countDocuments();
    res.json({ admins, instructors, courses, lectures });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
