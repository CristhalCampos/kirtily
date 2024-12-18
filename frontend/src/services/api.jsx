import axios from "axios";
import { refreshToken } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

// Interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token (403 or 401)
    if ((error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Propagate other errors
  }
);

export default api;