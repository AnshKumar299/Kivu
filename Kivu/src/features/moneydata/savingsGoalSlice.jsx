import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  goal: 500000,
  current: 140000, // static initial value; dynamic updates happen via reducer
  goalReached: false,
};

export const savingsGoalSlice = createSlice({
  name: "savingsGoal",
  initialState,
  reducers: {
    addSavings: (state, action) => {
      state.current += action.payload;
      if (state.current >= state.goal) {
        state.goalReached = true;
      }
    },
  },
});

export const { addSavings } = savingsGoalSlice.actions;

export default savingsGoalSlice.reducer;
