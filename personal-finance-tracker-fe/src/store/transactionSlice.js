import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactions, createTransaction } from "api";

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTransactions();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch transactions");
    }
  }
);

// Async thunk to create a transaction
export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const newTransaction = await createTransaction(transactionData);
      return newTransaction;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add transaction");
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add a new transaction
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        console.log("Fetched Transactions:", action.payload);
        state.loading = false;
        const newTransaction = action.payload?.transaction;

        // Add the new transaction to the items array and sort by transaction_date
        state.items = [newTransaction, ...state.items].sort(
          (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
        ); // Add the new transaction to the state
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
