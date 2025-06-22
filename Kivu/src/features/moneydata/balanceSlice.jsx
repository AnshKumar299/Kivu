import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  net:45000,
  rent:20000,
  food:5000,
  clothing:6000,
  taxes:2000,
  bills:5000,
  micellaneous:3000,
  savings:0
}

initialState.savings=initialState.net-(initialState.rent+initialState.bills+initialState.clothing+initialState.food+initialState.taxes);

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    addSpending: (state, action) => {
      const { type, amount } = action.payload;

      // Check if the spending type exists in state
      if (state.hasOwnProperty(type)) {
        state[type] += amount;
      } else {
        // Optionally handle new categories
        state[type] = amount;
      }

      // Recalculate total spendings
      const totalSpending = Object.entries(state)
        .filter(([key]) => key !== 'net' && key !== 'savings')
        .reduce((sum, [, value]) => sum + value, 0);

      // Update savings
      state.savings = state.net - totalSpending;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addSpending } = balanceSlice.actions

export default balanceSlice.reducer