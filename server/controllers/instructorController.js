const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login Instructor
exports.loginInstructor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      return res.status(400).json({ message: "Instructor not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: instructor._id, role: "instructor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ instructor, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
