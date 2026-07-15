import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/inventory";

const getToken = () => localStorage.getItem("token");

const axiosInstance = API.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getAllInventory = () => axiosInstance.get("");

export const getLowStock = () => axiosInstance.get("/low-stock");

export const getOutOfStock = () => axiosInstance.get("/out-of-stock");

export const getInventoryByProduct = (id) => axiosInstance.get(`/${id}`);
