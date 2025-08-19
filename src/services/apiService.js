import axios from "axios";

// Base URLs for each DB depending on environment
const bigQueryBase =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://genaipayment-backend-719673130781.europe-west1.run.app/proxy/8000";

const mongoBase =
  import.meta.env.MODE === "development"
    ? "/mongoapi"
    : "https://genaipayment-backend-719673130781.europe-west1.run.app/proxy/8000";

// Axios instances
const bigQueryApi = axios.create({
  baseURL: bigQueryBase,
  headers: {
    "Content-type": "application/json",
  },
});

const mongoApi = axios.create({
  baseURL: mongoBase,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json", // matches your curl headers
  },
});

// Function to get the correct API instance based on selected DB
export const getApiByDb = (dbName) => {
  if (dbName === "Mongo DB") return mongoApi;
  return bigQueryApi;
};

// Unified query processor
export const processQuery = async (question, dbName = "Big Query DB") => {
  const api = getApiByDb(dbName);
  const endpoint = dbName === "Mongo DB" ? "/mongodb_query" : "/process_query";

  try {
    const response = await api.post(endpoint, { question });
    return response.data;
  } catch (error) {
    console.error(`${dbName} error:`, error.response?.data || error.message);
    throw error;
  }
};
