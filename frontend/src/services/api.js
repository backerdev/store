import axios from "axios";

const URL = "https://store-x8vy.onrender.com/";

const api = axios.create({
  baseURL: URL,
  withCredentials: true, // Include cookies with cross-origin requests
});

// Define the functions for each endpoint
export const getApiSession = () => api.get("/auth/session");
export const getUsers = () => api.get("/auth/getusers");
export const register = (body) => api.post("/auth/register", body);

export const logout = () => api.get("/auth/logout");

export const createNewItem = (newItem) => api.post("/create", newItem);

export const updateItem = (body) => api.patch("/update", body);

export const deleteItem = (body) => api.delete("/delete", { data: body });

export default api;
