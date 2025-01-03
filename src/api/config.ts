export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3003",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const API_VERSION = "/api/v1";
