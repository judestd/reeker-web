// src/api/client.ts
import axios from "axios";
import { getStoredToken, removeStoredToken } from "../utils/auth";
import { API_CONFIG } from "./config";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";

const apiClient = axios.create(API_CONFIG);

apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.config.url !== "/api/v1/web/auth/login") {
      // Clear all auth related state
      removeStoredToken();
      store.dispatch(logout());
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
      return;
    }
    return Promise.reject(error);
  },
);

export default apiClient;
