import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// Attach token (uf stored in localStorage)
API.interceptors.request.use((req) => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWIxNWM5MGIzOGU1MzgyNGY3NzUwZDUiLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwiZnVsbG5hbWUiOiJBZG1pbiIsImlhdCI6MTc3MzgyNjEyNCwiZXhwIjoxNzczOTEyNTI0fQ.rV_8RuJyFnhgqp6vk18DO1IKhOTrEEns73nFAMNecQo";
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
