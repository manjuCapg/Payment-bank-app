import axios from "axios";

const baseApi =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://genaipayment-backend-719673130781.europe-west1.run.app/proxy/8000";

const api = axios.create({
  baseURL: baseApi, // Use the proxy defined in vite.config.js
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
