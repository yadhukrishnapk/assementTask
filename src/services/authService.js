import axios from "axios";
import useAuthStore from "../store/authStore";

const BASE_URL = "https://core-skill-test.webc.in/employee-portal/api/v1";
const api = axios.create({ 
  baseURL: BASE_URL,
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAuthActions = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const loginUser = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setAuth(response.data.data.token, response.data.data);
        return response.data;
      }
      
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      }
      if (error.code === 'ECONNABORTED') {
        return { success: false, message: "Request timed out. Please try again." };
      }
      return { 
        success: false, 
        message: error.message || "Login failed. Please check your connection and try again."
      };
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/settings/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      clearAuth();
    }
  };

  return { loginUser, logoutUser };
};
