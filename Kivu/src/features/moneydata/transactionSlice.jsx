import { createSlice } from "@reduxjs/toolkit";
import txnlist from '../../dB/Transactions.json';

export const transactionSlice = createSlice({
  name: 'transacs',
  initialState:{
    data: txnlist,
  },
  reducers: {
    addTransaction: (state, action) => {
      state.data.push(action.payload);
    },
    deleteTransaction:(state,action) => {
        //gives the id as the action payload
        const newlist = state.data.filter((item) =>
            item.id !== action.payload
        );

        state.data=newlist;
    }
  },
});

export const { addTransaction,deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;