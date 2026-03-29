// src/axios/db.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add token automatically to protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken"); // token saved after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
