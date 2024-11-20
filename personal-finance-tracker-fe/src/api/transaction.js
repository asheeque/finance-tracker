import API_BASE_URL from "config";

// Fetch transactions API call
export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
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
      const { error } = await response.json();
      throw new Error(error || "Failed to fetch transactions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    throw error;
  }
};

export const createTransaction = async ({ amount, description, date, category = "default-category" }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated. Missing token.");
    }

    const body = {
      amount,
      description,
      category, // Default to "default-category" if not provided
      transaction_date: date
    };
    console.log(body)
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
