// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // require("dotenv").config();

// // const adminRoutes = require("./routes/adminRoutes");
// // const instructorRoutes = require("./routes/instructorRoutes");

// // const app = express();

// // // Middlewares
// // app.use(cors());
// // app.use(express.json());

// // // Check API health
// // app.get("/", (req, res) => {
// //   res.send("API is running...");
// // });

// // // ROUTES
// // app.use("/api/admin", adminRoutes);
// // app.use("/api/instructor", instructorRoutes);

// // // DB Connection
// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.log("DB Error: ", err));

// // // Start Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();

// const adminRoutes = require("./routes/adminRoutes");
// const instructorRoutes = require("./routes/instructorRoutes");

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use("/api/admin", adminRoutes);
// app.use("/api/instructor", instructorRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("DB Error:", err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Routes
const adminRoutes = require("./routes/adminRoutes");
const instructorRoutes = require("./routes/instructorRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/instructor", instructorRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
