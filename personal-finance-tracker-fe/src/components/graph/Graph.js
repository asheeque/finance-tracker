import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { parseISO, format } from "date-fns";
import { Paper } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const { items: transactions } = useSelector((state) => state.transactions);

  // Process transactions to group by day and sum daily expenses
  const dailyData = useMemo(() => {
    const processTransactions = (transactions) => {
      const dailyData = {};

      transactions.forEach((transaction) => {
        if (!transaction.transaction_date) {
          console.warn("Missing transaction_date for transaction:", transaction);
          return; // Skip if transaction_date is missing
        }

        try {
          const transactionDate = parseISO(transaction.transaction_date); // Parse the date
          const dayKey = format(transactionDate, "yyyy-MM-dd"); // Format the date

          if (!dailyData[dayKey]) {
            dailyData[dayKey] = 0;
          }

          dailyData[dayKey] += transaction.amount;
        } catch (error) {
          console.error("Invalid transaction_date:", transaction.transaction_date);
          console.error(error);
        }
      });

      return dailyData;
    };

    return processTransactions(transactions);
  }, [transactions]); // Recalculate when transactions change

  // Prepare data for Chart.js
  const sortedDates = Object.keys(dailyData).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const labels = sortedDates;
  const dailySums = sortedDates.map((date) => dailyData[date]);
  const data = {
    labels, // Dates in sorted order
    datasets: [
      {
        label: "Daily Expenses",
        data: dailySums, // Daily expense sums
        fill: true, // Enable background fill
        backgroundColor: "rgba(0, 0, 0, 1)", // Black for background fill
        borderColor: "rgba(0, 0, 0, 1)", // Black for the line
        pointBackgroundColor: "rgba(0, 0, 0, 1)", // Black for points
        pointBorderColor: "rgba(0, 0, 0, 1)", // Black for point borders
        pointHoverBackgroundColor: "rgba(0, 0, 0, 1)", // Black on hover
        pointHoverBorderColor: "rgba(0, 0, 0, 1)", // Black on hover border
        tension: 0.4, // Smooth curve for the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#000000",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Daily Expenses Over Time",
        color: "#000000",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000000",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.9)",
        },
      },
      y: {
        ticks: {
          color: "rgb(0,0,0)",
          font: {
            size: 12,
          },
          callback: function (value) {
            return "$" + value;
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
  };

  return (
    <Paper
      elevation={3}
      style={{
        height: "90%",
        backgroundColor: "rgb(255, 255, 255)",
        padding: "20px",
      }}
    >
      <Line data={data} options={options} />
    </Paper>
  );
};

export default Graph;
