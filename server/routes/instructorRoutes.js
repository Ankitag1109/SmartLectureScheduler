const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Instructor = require("../models/Instructor");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newInstructor = await Instructor.create({
      name,
      email,
      password,
      department,
    });

    res.status(201).json({
      message: "Instructor registered successfully",
      instructor: {
        id: newInstructor._id,
        name: newInstructor.name,
        email: newInstructor.email,
        department: newInstructor.department,
      },
    });
  } catch (err) {
    console.error("Instructor register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const instructor = await Instructor.findOne({ email });
    if (!instructor)
      return res.status(400).json({ message: "Instructor not found" });

    if (instructor.password !== password)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: instructor._id, role: "instructor" },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      instructor: {
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
        department: instructor.department,
      },
    });
  } catch (err) {
    console.error("Instructor login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({ instructor: instructorId }).populate(
      "instructor",
      "name email"
    );

    const lectures = await Lecture.find({ instructor: instructorId })
      .populate("course", "title")
      .populate("instructor", "name email");

    res.json({
      success: true,
      courses,
      lectures,
    });
  } catch (err) {
    console.error("Instructor dashboard error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard" });
  }
});

module.exports = router;
