import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchUsername = createAsyncThunk('fetchUsername', async()=>{
	const response = await axios.get('http://localhost:3000/api/auth/verify',{
    withCredentials:true, // send Cookies
  });
	return response.data;
});

export const usernameSlice = createSlice({
  name: 'username',
  initialState:{
    isLoading: false,
    data:null,
    isError:false,
    checked:false
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchUsername.pending,(state,action)=>{
      state.isLoading=true;
      state.checked=false;
      state.isError=false;
    });

    builder.addCase(fetchUsername.fulfilled, (state,action)=>{
      if (action.payload.status) {
        state.data = action.payload.user; // set username
      } else {
        state.data = null; // no user logged in
      }
      state.checked=true;
      state.isLoading=false;
    })

    builder.addCase(fetchUsername.rejected,(state,action)=>{
      state.isLoading = false;
      state.checked=true;
      state.isError = true;
      state.data = null;
      console.error("Failed to fetch username:", action.error);
    })
  }
})

export default usernameSlice.reducer