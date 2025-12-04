// server/middleware/verifyAdmin.js
const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(403).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // Bearer token
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.role || decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. You must be an admin." });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("verifyAdmin error:", err);
    return res.status(403).json({ message: "Access denied. Invalid token." });
  }
};

module.exports = verifyAdmin;
