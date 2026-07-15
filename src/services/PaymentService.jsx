import API from "./AxiosConfig";

const REST_API_BASE_URL = "http://localhost:8081/api/payments";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Basic ${token}`,
    },
  };
};

// ===========================
// Get All Payments
// ===========================
export const listPayments = () => axios.get(REST_API_BASE_URL, getAuthConfig());

// ===========================
// Get Payment By Id
// ===========================
export const getPayment = (paymentId) =>
  API.get(`${REST_API_BASE_URL}/${paymentId}`, getAuthConfig());

// ===========================
// Create Payment
// ===========================
export const createPayment = (payment) =>
  API.post(REST_API_BASE_URL, payment, getAuthConfig());

// ===========================
// Update Payment
// ===========================
export const updatePayment = (paymentId, payment) =>
  API.put(`${REST_API_BASE_URL}/${paymentId}`, payment, getAuthConfig());

// ===========================
// Delete Payment
// ===========================
export const deletePayment = (paymentId) =>
  API.delete(`${REST_API_BASE_URL}/${paymentId}`, getAuthConfig());
