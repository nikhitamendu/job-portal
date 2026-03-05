import axios from "axios";
  //This file creates a centralized Axios instance that automatically attaches authentication tokens and connects React to backend APIs.
const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL:"https://job-portal-backend-jtjz.onrender.com/api",
  withCredentials: true, // for refresh token cookie
});

let accessToken = null;
// We DO NOT store access token in localStorage. we keep it in memory
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
//this runs before every req //React request → interceptor → attach JWT → backend
export default api;
