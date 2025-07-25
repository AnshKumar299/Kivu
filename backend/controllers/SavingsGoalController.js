const SavingsGoal = require("../models/SavingsGoal");

// Create a savings goal
exports.addGoal = async (req, res) => {
  try {
    const { targetAmount, savedAmount } = req.body;

    if (!targetAmount) {
      return res.status(400).json({ message: "Target amount is required" });
    }

    const goal = new SavingsGoal({
      userId: req.user._id,
      targetAmount,
      savedAmount: savedAmount || 0,
    });

    await goal.save();
    res.status(201).json({ success: true, message: "Goal created", goal });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all savings goals for a user
exports.getGoals = async (req, res) => {
  try {
    const goals = await SavingsGoal.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a goal (update saved amount or target)
exports.updateGoal = async (req, res) => {
  try {
    const updatedGoal = await SavingsGoal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json({ success: true, message: "Goal updated", goal: updatedGoal });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a savings goal
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await SavingsGoal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json({ success: true, message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
