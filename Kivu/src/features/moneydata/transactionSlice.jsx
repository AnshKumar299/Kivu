import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTransacs = createAsyncThunk("fetchTransacs", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:4000/api/transaction/", {
      withCredentials: true,
    });
    return response.data; // returns transaction list (array)
  } catch (err) {
    if (err.response?.status === 404) {
      // No transactions found - return empty list
      return [];
    }
    return rejectWithValue(err.response?.data || "Server Error");
  }
});


export const addTransaction = createAsyncThunk(
  "addTransacs",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/transaction/",
        transactionData,
        { withCredentials: true }
      );
      return response.data.transaction; // return only the created transaction
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server Error");
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "deleteTransac",
  async (transactionId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/api/transaction/${transactionId}`, {
        withCredentials: true,
      });
      return transactionId; // we only need the id to remove locally
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete transaction");
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "updateTransac",
  async ({ transactionId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/transaction/${transactionId}`,
        updatedData,
        { withCredentials: true }
      );
      return response.data.transaction; // return the updated transaction only
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update transaction");
    }
  }
);

export const transactionSlice = createSlice({
  name: "transacs",
  initialState: {
    data: [], // transactions
    isLoading: false,
    error: null,
    checked: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTransacs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransacs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransacs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch transactions";
      })

      // Add
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.unshift(action.payload); // new transaction on top
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add transaction";
      })

      // Delete
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((txn) => txn._id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete transaction";
      })

      // Update
      .addCase(updateTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.data.findIndex((txn) => txn._id === action.payload._id);
        if (idx !== -1) {
          state.data[idx] = action.payload; // overwrite with updated transaction
        }
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update transaction";
      });
  },
});

export default transactionSlice.reducer;
