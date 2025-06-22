import { createSlice } from "@reduxjs/toolkit";

export const genderSlice = createSlice({
  name: 'gender',
  initialState: {
    value: 'male',
  },
  reducers: {
    setGender: (state,action) => {
        state.value=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGender } = genderSlice.actions

export default genderSlice.reducer