const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const transactionRoutes = require("./routes/transactionRoutes");
const savingsGoalRoutes = require("./routes/savingsGoalRoute");
require("dotenv").config();

const app = express();

// Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB connected successfully");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

// --- CORS Middleware ---
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // e.g. "https://kivu.vercel.app"
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle preflight OPTIONS requests for all routes
app.options("*", cors());

// Other middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("APP IS WORKING PROPERLY");
});

app.use("/api/auth", authRoute);
app.use("/api/transaction", transactionRoutes);
app.use("/api/goals", savingsGoalRoutes);

// --- Export app for Vercel ---
module.exports = app;
