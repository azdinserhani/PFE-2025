import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Initialize token
let token = null;

// Get token from persisted Redux state (localStorage)
const persistedData = localStorage.getItem("persist:root");

if (persistedData) {
  try {
    const parsedData = JSON.parse(persistedData);
    const user = parsedData?.user ? JSON.parse(parsedData.user) : null;
    token = user?.token || null;
  } catch (error) {
    console.error("Error parsing persisted data:", error);
  }
}

// Create public request instance
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Create user request instance with Authorization header if token exists
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});
const userToken = JSON.parse(JSON.parse(persistedData).user).token;
export const paymentRequest = axios.create({
  baseURL: import.meta.env.VITE_PAYMENT_URL,
  headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
});
