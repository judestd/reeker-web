// src/api/client.ts
import axios from 'axios';
import { getStoredToken, removeStoredToken } from '../utils/auth';
import { API_CONFIG } from './config';

const apiClient = axios.create(API_CONFIG);

apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeStoredToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
