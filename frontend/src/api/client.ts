import axios from "axios";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      toast.error("Session expired. Please login again");

      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
