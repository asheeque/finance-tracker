import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Autocomplete,
} from "@mui/material";
import { createTransaction } from "api/transaction"; // Adjust the path based on your structure
import { useDispatch } from "react-redux";
import { addTransaction } from "store/transactionSlice";

const categories = ["All", "Groceries", "Utilities", "Rent", "Entertainment"];

const AddTransactionBox = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Local time for display
    return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  });
  const [transactionType, setTransactionType] = useState("expense");
  const [category, setCategory] = useState("All"); // State for category
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Convert local date to UTC
    const utcDate = new Date(date);
    utcDate.setMinutes(utcDate.getMinutes() + utcDate.getTimezoneOffset()); // Convert to UTC

    const body = {
      amount: parseFloat(amount),
      description,
      category,
      transaction_date: utcDate.toISOString().split("T")[0], // Store as UTC
      transaction_type: transactionType,
    };
    console.log(body,"bnod")
    try {
      await dispatch(addTransaction(body)).unwrap();
      setSuccess(true);
      setDescription("");
      setAmount("");
      setDate(() => {
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        return today.toISOString().split("T")[0];
      });
      setTransactionType("expense");
      setCategory("");
    } catch (err) {
      setError(err.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, width: "100%" }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Add Transaction
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="primary" gutterBottom>
          Transaction added successfully!
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            variant="outlined"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            required
            // Restrict future dates
            inputProps={{
              max: new Date().toISOString().split("T")[0], // Max is today's date
            }}
          />
        </Box>
        <Box mb={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Transaction Type</FormLabel>
            <RadioGroup
              aria-label="transaction-type"
              name="transaction-type"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              row
            >
              <FormControlLabel
                value="income"
                control={<Radio />}
                label="Income"
              />
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box mb={2}>
          <Autocomplete
            freeSolo
            options={categories}
            value={category}
            onChange={(event, newValue) => {
              setCategory(newValue || "");
            }}
            onInputChange={(event, newInputValue) => {
              setCategory(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </form>
    </Paper>
  );
};

export default AddTransactionBox;
