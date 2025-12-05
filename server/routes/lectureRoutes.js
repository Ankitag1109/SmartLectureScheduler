const express = require("express");
const router = express.Router();
const Lecture = require("../models/Lecture");

router.get("/", async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("courseId", "title")
      .populate("instructorId", "name email");

    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch lectures" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, date, courseId, instructorId } = req.body;

    const lecture = new Lecture({
      title,
      date,
      courseId,
      instructorId,
    });

    await lecture.save();

    res.json({ message: "Lecture added successfully" });
  } catch (err) {
    console.error("Error adding lecture:", err);
    res.status(500).json({ error: "Failed to add lecture" });
  }
});

module.exports = router;
