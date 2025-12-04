const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // in production, hash this
});

module.exports = mongoose.model("Admin", adminSchema);
