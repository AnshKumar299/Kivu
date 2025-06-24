import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  net: 45000,
  rent: 20000,
  food: 2100,
  clothing: 1200,
  taxes: 2000,
  bills: 5000,
  savings: 4000,
  miscellaneous:30,
  remaining: 0,
};

const calculateTotals = (state) => {
  // Spending keys to include
  const spendingKeys = ['rent', 'food', 'clothing', 'taxes', 'bills', 'savings'];
  const totalSpending = spendingKeys.reduce((sum, key) => sum + (state[key] || 0), 0);
  state.remaining = state.net - totalSpending;
};

calculateTotals(initialState); // set initial `remaining`

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    addSpending: (state, action) => {
      const { type, amount } = action.payload;

      if (state.hasOwnProperty(type)) {
        state[type] += amount;
      } else {
        state[type] = amount;
      }

      // Recalculate remaining and savings
      const fixedKeys = ['rent', 'food', 'clothing', 'taxes', 'bills'];
      const totalFixedSpending = fixedKeys.reduce((sum, key) => sum + (state[key] || 0), 0);
      state.savings = state.net - totalFixedSpending;
      calculateTotals(state);
    },
  },
});

export const { addSpending } = balanceSlice.actions;
export default balanceSlice.reducer;
