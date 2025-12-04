// server/createAdmin.js
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10); // Password: admin123
  await Admin.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashedPassword,
  });
  console.log("Admin created!");
  mongoose.disconnect();
}

createAdmin();
