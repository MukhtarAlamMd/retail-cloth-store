import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/supplier-payments";

// ==============================
// JWT Header
// ==============================

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ==============================
// Get All Payments
// ==============================

export const getAllSupplierPayments = () => {
  return API.get(API_URL, getAuthHeader());
};

// ==============================
// Get Payment By Id
// ==============================

export const getSupplierPaymentById = (id) => {
  return API.get(`${API_URL}/${id}`, getAuthHeader());
};

// ==============================
// Save Payment
// ==============================

export const saveSupplierPayment = (payment) => {
  return API.post(API_URL, payment, getAuthHeader());
};

// ==============================
// Update Payment
// ==============================

export const updateSupplierPayment = (id, payment) => {
  return API.put(`${API_URL}/${id}`, payment, getAuthHeader());
};

// ==============================
// Delete Payment
// ==============================

export const deleteSupplierPayment = (id) => {
  return API.delete(`${API_URL}/${id}`, getAuthHeader());
};

// ==============================
// Payment History
// ==============================

export const getPaymentsBySupplier = (supplierId) => {
  return API.get(`${API_URL}/supplier/${supplierId}`, getAuthHeader());
};

// ==============================
// Date Report
// ==============================

export const getPaymentsBetweenDates = (startDate, endDate) => {
  return API.get(
    `${API_URL}/date?startDate=${startDate}&endDate=${endDate}`,

    getAuthHeader(),
  );
};

// ==============================
// Supplier Date Report
// ==============================

export const getSupplierPaymentsBetweenDates = (
  supplierId,
  startDate,
  endDate,
) => {
  return API.get(
    `${API_URL}/supplier/${supplierId}/date?startDate=${startDate}&endDate=${endDate}`,

    getAuthHeader(),
  );
};

// ==============================
// Total Supplier Payment
// ==============================

export const getTotalPaymentBySupplier = (supplierId) => {
  return API.get(`${API_URL}/supplier/${supplierId}/total`, getAuthHeader());
};

// ==============================
// Total Payments
// ==============================

export const getTotalPayments = () => {
  return API.get(`${API_URL}/total`, getAuthHeader());
};

// ==============================
// Latest Payments
// ==============================

export const getLatestPayments = () => {
  return API.get(`${API_URL}/latest`, getAuthHeader());
};
