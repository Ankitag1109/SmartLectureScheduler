const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    if (password !== admin.password)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/instructors", authMiddleware, async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await Instructor.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Instructor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const instructor = new Instructor({
      name,
      email,
      password: hashedPassword,
      department,
    });

    await instructor.save();

    res.status(201).json({
      id: instructor._id,
      name: instructor.name,
      email: instructor.email,
    });
  } catch (err) {
    console.error("Error adding instructor:", err);
    res.status(500).json({ message: "Failed to add instructor" });
  }
});

router.get("/instructors", authMiddleware, async (req, res) => {
  try {
    const instructors = await Instructor.find({}, "name email department");
    res.json(instructors);
  } catch (err) {
    console.error("Error fetching instructors:", err);
    res.status(500).json({ message: "Failed to fetch instructors" });
  }
});

router.post("/courses", authMiddleware, async (req, res) => {
  try {
    const { title, description, instructor } = req.body;

    if (!title || !description || !instructor)
      return res.status(400).json({ message: "All fields are required" });

    const instructorExists = await Instructor.findById(instructor);
    if (!instructorExists)
      return res.status(400).json({ message: "Instructor not found" });

    const course = new Course({ title, description, instructor });
    await course.save();

    const populated = await Course.findById(course._id).populate(
      "instructor",
      "name email"
    );

    res.status(201).json(populated);
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ message: "Failed to create course" });
  }
});

router.get("/courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

router.post("/create-lecture", verifyAdmin, async (req, res) => {
  try {
    const { title, date, course, instructor } = req.body;

    if (!title || !date || !course || !instructor) {
      return res.status(400).json({ message: "All fields required" });
    }

    const lectureDate = new Date(date).setHours(0, 0, 0, 0);

    const existingLecture = await Lecture.findOne({
      instructor,
      date: {
        $gte: new Date(lectureDate),
        $lte: new Date(lectureDate + 24 * 60 * 60 * 1000),
      },
    });

    if (existingLecture) {
      return res.status(400).json({
        message: "Instructor already has a lecture assigned on this date",
      });
    }

    const newLecture = new Lecture({
      title,
      date,
      course,
      instructor,
    });

    await newLecture.save();

    res.status(201).json({
      message: "Lecture created successfully!",
      lecture: newLecture,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/lectures", authMiddleware, async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("course", "title")
      .populate("instructor", "name email");
    res.json(lectures);
  } catch (err) {
    console.error("Error fetching lectures:", err);
    res.status(500).json({ message: "Failed to fetch lectures" });
  }
});

module.exports = router;
