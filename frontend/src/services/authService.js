import { api } from "../api/apiClient";

export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
  login: async (Credentials) => {
    const response = await api.post("/auth/login", Credentials);
    return response.data;
  },
};
