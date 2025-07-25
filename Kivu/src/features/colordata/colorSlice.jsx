// features/ui/colorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rent: {
    bg: 'bg-blue-300',
    text: 'text-blue-900',
    icon: '🏡'
  },
  food: {
    bg: 'bg-yellow-300',
    text: 'text-yellow-900',
    icon: '🥗'
  },
  clothing: {
    bg: 'bg-red-300', // richer crimson-like
    text: 'text-red-900',
    icon: '👕'
  },
  taxes: {
    bg: 'bg-sky-300',
    text: 'text-sky-900',
    icon: '💰'
  },
  bills: {
    bg: 'bg-emerald-300',
    text: 'text-emerald-900',
    icon: '💵'
  },
  miscellaneous: {
    bg: 'bg-pink-300',
    text: 'text-pink-900',
    icon: '💼'
  },
  savings: {
    bg: 'bg-orange-300',
    text: 'text-orange-900',
    icon: '💳'
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