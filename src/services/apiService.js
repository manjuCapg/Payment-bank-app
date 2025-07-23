import axios from "axios";

// const baseURL =
//   "https://genaipayment-backend-719673130781.europe-west1.run.app";

const api = axios.create({
  baseURL: "/api", // Use the proxy defined in vite.config.js
  headers: {
    "Content-type": "application/json",
  },
});

export const processQuery = async (question) => {
  try {
    const response = await api.post("/process_query", { question });
    return response.data;
  } catch (error) {
    console.error("Error processing query:", error);
    throw error;
  }
};
