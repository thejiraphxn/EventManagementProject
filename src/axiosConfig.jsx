import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/authen`,
});

// Add Authorization header to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token"); // Token expired, logout the user
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
