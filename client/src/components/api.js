import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Schimbă cu URL-ul backend-ului
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
