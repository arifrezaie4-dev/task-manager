import { api } from "../api/apiClient";

export const userService = {
  getMe: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await api.put("/users/me", userData);
    return response.data;
  },
  changePassword: async (passwordData) => {
    const response = await api.put("/users/change-password", passwordData);
    return response.data;
  },
};
