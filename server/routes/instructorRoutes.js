// server/routes/instructorRoutes.js
const express = require("express");
const router = express.Router();
const Instructor = require("../models/Instructor");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// =====================
// POST /api/instructor/login
// =====================
// POST /api/instructor/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const instructor = await Instructor.findOne({ email });
    if (!instructor)
      return res.status(404).json({ message: "Instructor not found" });

    // Plain-text password check for testing only
    if (instructor.password !== password)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: instructor._id, role: "instructor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      instructor: {
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// GET /api/instructor/dashboard
// =====================
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const instructorId = req.user.id;

    // Fetch courses assigned to this instructor
    const courses = await Course.find({ instructorId });

    // Fetch lectures assigned to this instructor
    const lectures = await Lecture.find({ instructorId }).populate("courseId");

    res.json({
      courses: courses.length,
      lectures: lectures.length,
      courseList: courses,
      lectureList: lectures,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
