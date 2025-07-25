const express = require("express");
const router = express.Router();
const { userVerification } = require("../middlewares/AuthMiddleware");
const {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/SavingsGoalController");

// CRUD Routes
router.post("/", userVerification, addGoal);        // Create goal
router.get("/", userVerification, getGoals);        // Get all goals
router.put("/:id", userVerification, updateGoal);   // Update a goal
router.delete("/:id", userVerification, deleteGoal);// Delete a goal

module.exports = router;
