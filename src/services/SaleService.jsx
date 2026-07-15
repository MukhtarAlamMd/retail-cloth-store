import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/sales";

// Get All Sales
export const getAllSales = () => {
  return API.get(API_URL);
};

// Get Sale By Id
export const getSaleById = (id) => {
  return API.get(`${API_URL}/${id}`);
};

// Create Sale
export const createSale = (sale) => {
  return API.post(API_URL, sale);
};

// Update Sale
export const updateSale = (id, sale) => {
  return API.put(`${API_URL}/${id}`, sale);
};

// Delete Sale
export const deleteSale = (id) => {
  return API.delete(`${API_URL}/${id}`);
};
