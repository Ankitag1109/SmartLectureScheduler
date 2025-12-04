const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
});

module.exports = mongoose.model("Lecture", lectureSchema);
