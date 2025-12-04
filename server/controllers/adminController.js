const Instructor = require("../models/Instructor");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Admin = require("../models/Admin");

// Login
exports.loginAdmin = async (req, res) => {
  res.json({ message: "Login OK" });
};

// Dashboard
exports.getDashboardStats = async (req, res) => {
  const instructors = await Instructor.find();
  const courses = await Course.find();
  res.json({
    admins: 1,
    instructors: instructors.length,
    courses: courses.length,
  });
};

// Instructors
exports.getInstructors = async (req, res) => {
  const data = await Instructor.find();
  res.json(data);
};

exports.addInstructor = async (req, res) => {
  const { name, email } = req.body;
  await Instructor.create({ name, email });
  res.json({ message: "Instructor added" });
};

// Courses
exports.getCourses = async (req, res) => {
  const data = await Course.find();
  res.json(data);
};

exports.addCourse = async (req, res) => {
  const { title, description, instructorId } = req.body;
  await Course.create({ title, description, instructorId });
  res.json({ message: "Course added" });
};

// Lectures
exports.getLectures = async (req, res) => {
  const data = await Lecture.find();
  res.json(data);
};

exports.addLecture = async (req, res) => {
  const { title, date, courseId, instructorId } = req.body;
  await Lecture.create({ title, date, courseId, instructorId });
  res.json({ message: "Lecture added" });
};
