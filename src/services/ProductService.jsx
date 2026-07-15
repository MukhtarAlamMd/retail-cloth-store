import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/products";

// Get products with pagination
export const getAllProducts = (page = 0, size = 10) => {
  return API.get(`${API_URL}?page=${page}&size=${size}`);
};

// Get product by ID
export const getProductById = (id) => {
  return API.get(`${API_URL}/${id}`);
};

// Create product
export const createProduct = (product) => {
  return API.post(API_URL, product);
};

// Update product
export const updateProduct = (id, product) => {
  return API.put(`${API_URL}/${id}`, product);
};

// Delete product
export const deleteProduct = (id) => {
  return API.delete(`${API_URL}/${id}`);
};
