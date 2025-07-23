// middlewares/AuthMiddleware.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "No token" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(403).json({ status: false, message: "Invalid token" });
      }

      const user = await User.findById(data.id);
      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      }

      req.user = user;  // attach user to request
      next();           // continue to the route
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
};
