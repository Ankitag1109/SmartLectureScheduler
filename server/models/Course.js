const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
