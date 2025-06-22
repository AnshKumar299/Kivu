import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  name:'John Doe',
  gender:'male'
}
export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setName: (state,action) => {
        state.name=action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setName } = usernameSlice.actions

export default usernameSlice.reducer