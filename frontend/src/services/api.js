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
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await api.post("/auth/refresh");
//         setAccessToken(res.data.accessToken);

//         originalRequest.headers.Authorization =
//           `Bearer ${res.data.accessToken}`;

//         return api(originalRequest);
//       } catch (err) {
//         setAccessToken(null);
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );


export default api;
