// const mongoose = require("mongoose");

// const instructorSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }, // ✅ required
//     department: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Instructor", instructorSchema);
const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", instructorSchema);
