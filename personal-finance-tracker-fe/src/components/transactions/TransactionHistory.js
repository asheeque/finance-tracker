import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TablePagination,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "store/transactionSlice";

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const {
    items: transactions,
    loading,
    error,
  } = useSelector((state) => state.transactions);

  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  console.log(transactions);
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatToUTCDate = (dateString) => {
    const date = new Date(dateString);
  
    // Extract the month, day, and year
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();
  
    // Return in MM/DD/YYYY format
    return `${month}/${day}/${year}`;
  };
  // if (loading) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       sx={{ height: "100%" }}
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  console.log(transactions.length)
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        boxSizing: "border-box", // Prevent padding from affecting layout
        overflow: "hidden", // Prevent content from overflowing the Paper
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        Transaction History
      </Typography>
      <TableContainer
        component={Box} // Use Box for better layout control
        sx={{
          flex: 1, // Takes available space
          overflow: "auto", // Enables scrolling for table content
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>DATE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!transactions || transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Box sx={{ padding: 2 }}>No transactions to display.</Box>
                </TableCell>
              </TableRow>
            ) : (
              transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate transactions
                .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {formatToUTCDate(transaction.transaction_date)}
                    </TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {transaction.description}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: transaction.amount < 0 ? "red" : "green",
                      }}
                    >
                      ${transaction.amount}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={transactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          marginTop: 1,
        }}
      />
    </Paper>
  );
};

export default TransactionHistory;
