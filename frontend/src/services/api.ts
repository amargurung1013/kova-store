import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// 1. Attach Token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. NEW: Handle 401 Errors (Auto-Logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid/expired
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      
      // Only reload if we are not already on the login page (to avoid loops)
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        alert("Session expired. Please login again.");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);