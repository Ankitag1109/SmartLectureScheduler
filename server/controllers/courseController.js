const Course = require("../models/Course");
const Instructor = require("../models/Instructor");

exports.addCourse = async (req, res) => {
  try {
    // multer populates req.body and req.file
    const { name, level, description } = req.body;
    const imageFile = req.file;

    if (!name || !level || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const imageUrl = imageFile
      ? `${req.protocol}://${req.get("host")}/uploads/${imageFile.filename}`
      : null;

    const course = new Course({ name, level, description, image: imageUrl });
    await course.save();

    res.status(201).json({ message: "Course added successfully!", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding course" });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { instructorId, date } = req.body;

    if (!instructorId || !date) {
      return res
        .status(400)
        .json({ message: "Instructor and date are required" });
    }

    const course = await Course.findById(courseId);
    const instructor = await Instructor.findById(instructorId);

    if (!course || !instructor) {
      return res
        .status(404)
        .json({ message: "Course or instructor not found" });
    }

    const isConflict = course.lectures.some(
      (lec) => lec.date === date && lec.instructor.toString() === instructorId
    );

    if (isConflict) {
      return res
        .status(400)
        .json({ message: "Instructor already assigned on this date" });
    }

    course.lectures.push({ instructor: instructorId, date });
    await course.save();

    res.json({ message: "Lecture assigned successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAssignedLectures = async (req, res) => {
  try {
    const instructorId = req.user._id;

    const courses = await Course.find({ "lectures.instructor": instructorId });

    const lectures = [];

    courses.forEach((course) => {
      course.lectures.forEach((lec) => {
        if (lec.instructor.toString() === instructorId.toString()) {
          lectures.push({
            courseName: course.name,
            date: lec.date,
            lectureId: lec._id,
          });
        }
      });
    });

    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching lectures" });
  }
};
