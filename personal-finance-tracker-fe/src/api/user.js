import API_BASE_URL from "config";

// User login API call
export const loginUser = async (body) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Login failed");
  }

  return response.json();
};
