const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.json({
        message: "Login successful",
        token,
        role: "admin",
        name: user.name,
      });
    }

    user = await Instructor.findOne({ email });
    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user._id, role: "instructor" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.json({
        message: "Login successful",
        token,
        role: "instructor",
        name: user.name,
      });
    }

    // Invalid credentials
    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
