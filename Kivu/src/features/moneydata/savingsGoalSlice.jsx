import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch the user's savings goal (returns the latest or empty)
export const fetchSavingsGoal = createAsyncThunk("goal/fetch", async () => {
  const { data } = await axios.get("http://localhost:3000/api/goals", {
    withCredentials: true,
  }); // Returns an array
  return data.length > 0
    ? data[0]
    : { _id: null, targetAmount: 0, savedAmount: 0 };
});

// Save (create or update) a goal
export const saveSavingsGoal = createAsyncThunk(
  "goal/save",
  async ({ goalId, targetAmount }) => {
    let data;
    if (goalId) {
      // Update existing goal
      const res = await axios.put(
        `http://localhost:3000/api/goals/${goalId}`,
        { targetAmount },
        { withCredentials: true }
      );
      data = res.data.goal;
    } else {
      // Create new goal
      const res = await axios.post(
        `http://localhost:3000/api/goals`,
        { targetAmount },
        { withCredentials: true }
      );
      data = res.data.goal;
    }
    return data;
  }
);

// Slice
const savingsGoalSlice = createSlice({
  name: "savingsGoal",
  initialState: {
    _id: null,
    targetAmount: 0,
    savedAmount: 0,
    isLoading: false,
    checked: false, // Has the goal been fetched yet?
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavingsGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSavingsGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checked = true;
        const goal = Array.isArray(action.payload)
          ? action.payload[0]
          : action.payload;
        if (goal) {
          state._id = goal._id;
          state.targetAmount = goal.targetAmount;
          state.savedAmount = goal.savedAmount ?? 0;
        } else {
          state._id = null;
          state.targetAmount = 0;
          state.savedAmount = 0;
        }
      })
      .addCase(fetchSavingsGoal.rejected, (state) => {
        state.isLoading = false;
        state.checked = true; // Mark as checked even if failed
      })
      .addCase(saveSavingsGoal.fulfilled, (state, action) => {
        const goal = action.payload.goal || action.payload;
        state._id = goal._id;
        state.targetAmount = goal.targetAmount;
        state.savedAmount = goal.savedAmount ?? 0;
        state.checked = true;
      });
  },
});

export default savingsGoalSlice.reducer;
