import React from "react";
import Graph from "../components/graph/Graph";
import TransactionHistory from "../components/transactions/TransactionHistory";
import AddTransactionBox from "../components/addTransaction/AddTransactionBox";
import { Box } from "@mui/material";

const DashboardPage = () => {
  return (
    <Box display="flex" flexDirection="row" gap={2} padding={2} height={"90vh"} >
      <Box flex={2} display="flex" flexDirection="column" sx={{'padding':'50px'}}>
        <Box flex={1} minHeight={0}>
          <Graph />
        </Box>
        <Box flex={1} minHeight={0}>
          <TransactionHistory />
        </Box>
      </Box>
      <Box flex={1} display="flex" sx={{'width':'100%'}}  justifyContent="center"
      alignItems="center">
        <AddTransactionBox />
      </Box>
    </Box>
  );
};

export default DashboardPage;
