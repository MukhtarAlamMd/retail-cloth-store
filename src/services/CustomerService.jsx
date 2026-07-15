import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/customers";

// ==========================
// Get All Customers (Pagination)
// ==========================
export const getAllCustomers = (page = 0, size = 10) => {
  return API.get(`${API_URL}?page=${page}&size=${size}`);
};

// ==========================
// Get Customer By ID
// ==========================
export const getCustomerById = (id) => {
  return API.get(`${API_URL}/${id}`);
};

// ==========================
// Create Customer
// ==========================
export const createCustomer = (customer) => {
  return API.post(API_URL, customer);
};

// ==========================
// Update Customer
// ==========================
export const updateCustomer = (id, customer) => {
  return API.put(`${API_URL}/${id}`, customer);
};

// ==========================
// Delete Customer
// ==========================
export const deleteCustomer = (id) => {
  return API.delete(`${API_URL}/${id}`);
};

// ==========================
// Search Customers
// ==========================
export const searchCustomers = (keyword, page = 0, size = 10) => {
  return API.get(
    `${API_URL}/search?keyword=${keyword}&page=${page}&size=${size}`,
  );
};
