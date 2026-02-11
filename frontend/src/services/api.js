import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // for refresh token cookie
});

let accessToken = null;

// ✅ THIS IS CRITICAL
export const setAccessToken = (token) => {
  accessToken = token;
};

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
