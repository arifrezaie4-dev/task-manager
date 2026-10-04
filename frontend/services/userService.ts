import { api } from "@/api/apiClient";

export const userService = {
  getMe: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  updateProfile: async (userData: unknown) => {
    const response = await api.put("/users/me", userData);
    return response.data;
  },

  changePassword: async (passwordData: unknown) => {
    const response = await api.put(
      "/users/change-password",
      passwordData
    );

    return response.data;
  },
};