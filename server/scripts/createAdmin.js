// scripts/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) return console.log("Admin already exists");

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await Admin.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
    });
    console.log("Admin created:", admin.email);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
createAdmin();
