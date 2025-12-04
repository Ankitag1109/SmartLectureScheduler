const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(403).json({ message: "Access denied. Not an admin." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin)
      return res.status(403).json({ message: "Access denied. Not an admin." });

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Access denied. Not an admin." });
  }
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // id = instructor._id
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
