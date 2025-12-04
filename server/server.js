const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const instructorRoutes = require("./routes/instructorRoutes"); // <--- IMPORTANT

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/admin", adminRoutes);
app.use("/api/instructor", instructorRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => console.log("Server running"));
  })
  .catch((err) => console.error(err));
