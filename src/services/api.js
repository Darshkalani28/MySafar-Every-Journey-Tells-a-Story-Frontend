import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// Attach token to requests
API.interceptors.request.use((req) => {
  // Fixed: Use 'accessToken' instead of 'token' to match backend response
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
