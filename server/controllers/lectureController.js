const Lecture = require("../models/Lecture");

exports.assignLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { instructorId, date } = req.body;

    if (!courseId || !instructorId || !date)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await Lecture.findOne({ instructor: instructorId, date });
    if (existing)
      return res
        .status(400)
        .json({ message: "Instructor already assigned on this date" });

    const lecture = new Lecture({
      course: courseId,
      instructor: instructorId,
      date,
    });

    await lecture.save();
    res.status(201).json({ message: "Lecture assigned", lecture });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
