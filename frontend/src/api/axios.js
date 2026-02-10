import axios from "axios";  //automatically adds jwt token to every requesr

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {   //security check before every message goes out
  const token = localStorage.getItem("token");//reads saved jwt token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
