import { createSlice } from "@reduxjs/toolkit";

export const usernameSlice = createSlice({
  name: 'username',
  initialState: {
    value: 'John Doe',
  },
  reducers: {
    setName: (state,action) => {
        state.value=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName } = usernameSlice.actions

export default usernameSlice.reducer