import { api } from "@/api/apiClient";

export const authService = {
  register: async (userData: unknown) => {
    const response = await api.post("/auth/register", userData);

    return response.data;
  },

  login: async (credentials: unknown) => {
    const response = await api.post("/auth/login", credentials);

    return response.data;
  },
};