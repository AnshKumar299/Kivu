import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  goal: 30000,
};

export const savingsGoalSlice = createSlice({
  name: "savingsGoal",
  initialState,
  reducers: {
    addSavings: (state, action) => {
      state.current += action.payload;
    },
    resetEverything:(state) =>{
      state.goal = 0;
      state.current=0;
      state.goalReached=false;
    },
    updateGoal:(state,action)=>{
      state.goal=action.payload;
    },

  },
});

export const { addSavings,updateGoal,resetEverything } = savingsGoalSlice.actions;

export default savingsGoalSlice.reducer;
