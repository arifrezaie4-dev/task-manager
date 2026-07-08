import { api } from "../api/apiClient"

export const taskService = {
    getTasks: async() => {
        const response = await api.get("/tasks")
        return response.data
    },
    createTask: async(taskData) => {
        const response = await api.post("/tasks", taskData)
        return response.data
    }
}