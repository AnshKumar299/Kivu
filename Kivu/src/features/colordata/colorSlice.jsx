// features/ui/colorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rent: {
    bg: 'bg-blue-200',
    text: 'text-blue-700',
    icon:'🏡'
  },
  food: {
    bg: 'bg-yellow-200',
    text: 'text-yellow-700',
    icon:'🥗'
  },
  clothing: {
    bg: 'bg-red-200', // crimson-like
    text: 'text-red-800',
    icon:'👕'
  },
  taxes: {
    bg: 'bg-sky-200',
    text: 'text-sky-700',
    icon:'💰'
  },
  bills: {
    bg: 'bg-emerald-200',
    text: 'text-emerald-700',
    icon:'💵'
  },
  miscellaneous: {
    bg: 'bg-pink-200',
    text: 'text-pink-700',
    icon:'💼'
  },
  savings: {
    bg: 'bg-orange-200',
    text: 'text-orange-700',
    icon:'💳'
  },
};

const colorSlice = createSlice({
  name: 'categoryColors',
  initialState,
  reducers: {
    setColor: (state, action) => {
      const { category, bg, text } = action.payload;
      if (state[category]) {
        state[category] = { bg, text };
      }
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;