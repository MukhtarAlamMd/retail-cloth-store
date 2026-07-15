import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/customer-payments";

// JWT Token
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ================================
// Get All Customer Payments
// ================================
export const getAllCustomerPayments = () => {
  return API.get(API_URL, getAuthHeader());
};

// ================================
// Get Customer Payment By Id
// ================================
export const getCustomerPaymentById = (id) => {
  return API.get(`${API_URL}/${id}`, getAuthHeader());
};

// ================================
// Get Payments By Customer
// ================================
export const getPaymentsByCustomer = (customerId) => {
  return API.get(`${API_URL}/customer/${customerId}`, getAuthHeader());
};

// ================================
// Create Customer Payment
// ================================
export const createCustomerPayment = (payment) => {
  return API.post(API_URL, payment, getAuthHeader());
};

// ================================
// Update Customer Payment
// ================================
export const updateCustomerPayment = (id, payment) => {
  return API.put(`${API_URL}/${id}`, payment, getAuthHeader());
};

// ================================
// Delete Customer Payment
// ================================
export const deleteCustomerPayment = (id) => {
  return API.delete(`${API_URL}/${id}`, getAuthHeader());
};
