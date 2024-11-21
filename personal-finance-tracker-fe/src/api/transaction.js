import API_BASE_URL from "config";
import { displayDate } from "utils/utils";

// Fetch transactions API call
export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token missing in localStorage");
      throw new Error("User is not authenticated. Missing token.");
    }

    const response = await fetch(`${API_BASE_URL}/transaction`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include Bearer token
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error Response:", errorResponse);
      // Return an empty array instead of throwing an error
      return [];
    }

    const data = await response.json();

    // Check if data is valid and an array
    if (!data || !Array.isArray(data)) {
      console.error("Unexpected API response format:", data);
      return []; // Return an empty array for invalid response format
    }

    // Map over transactions if the data is valid
    return data.map((transaction) => ({
      ...transaction,
      transaction_date: displayDate(transaction.transaction_date),
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    // Return an empty array if an exception occurs
    return [];
  }
};

export const createTransaction = async (body) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated. Missing token.");
    }

    const response = await fetch(`${API_BASE_URL}/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include Bearer token
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || "Failed to create transaction");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    throw error;
  }
};
