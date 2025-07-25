const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const transactionRoutes = require("./routes/transactionRoutes");
const savingsGoalRoute = require("./routes/savingsGoalRoute");
require("dotenv").config();

const app = express();

// --- Connect to MongoDB ---
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
})();

// --- CORS Configuration ---
const allowedOrigin = process.env.FRONTEND_URL || "https://kivu.vercel.app";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies/sessions
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors({ origin: allowedOrigin, credentials: true }));

// --- Middleware ---
app.use(cookieParser());
app.use(express.json());

// --- Routes ---
app.get("/", (req, res) => {
  res.send("APP IS WORKING PROPERLY");
});

app.use("/api/auth", authRoute);
app.use("/api/transaction", transactionRoutes);
app.use("/api/goals", savingsGoalRoute);

// --- Export app for Vercel (no app.listen) ---
module.exports = app;
