import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/categories";

// ==========================
// Get All Categories
// ==========================
export const getAllCategories = () => {
  return API.get(API_URL);
};

// ==========================
// Get Category By Id
// ==========================
export const getCategoryById = (id) => {
  return API.get(`${API_URL}/${id}`);
};

// ==========================
// Create Category
// ==========================
export const createCategory = (category) => {
  return API.post(API_URL, category);
};

// ==========================
// Update Category
// ==========================
export const updateCategory = (id, category) => {
  return API.put(`${API_URL}/${id}`, category);
};

// ==========================
// Delete Category
// ==========================
export const deleteCategory = (id) => {
  return API.delete(`${API_URL}/${id}`);
};
