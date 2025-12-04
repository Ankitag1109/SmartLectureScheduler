const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
