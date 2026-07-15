import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/payroll";

// ===============================
// Get All Payroll
// ===============================
export const listPayrolls = () => {
  return API.get(API_URL);
};

// ===============================
// Get Payroll By Id
// ===============================
export const getPayrollById = (id) => {
  return API.get(`${API_URL}/${id}`);
};

// ===============================
// Create Payroll
// ===============================
export const createPayroll = (payroll) => {
  return API.post(API_URL, payroll);
};

// ===============================
// Update Payroll
// ===============================
export const updatePayroll = (id, payroll) => {
  return API.put(`${API_URL}/${id}`, payroll);
};

// ===============================
// Delete Payroll
// ===============================
export const deletePayroll = (id) => {
  return API.delete(`${API_URL}/${id}`);
};

// ===============================
// Payroll By Employee
// ===============================
export const getPayrollByEmployee = (employeeId) => {
  return API.get(`${API_URL}/employee/${employeeId}`);
};

// ===============================
// Payroll By Status
// ===============================
export const getPayrollByPaymentStatus = (status) => {
  return API.get(`${API_URL}/status/${status}`);
};

// ===============================
// Payroll By Month & Year
// ===============================
export const getPayrollByMonthAndYear = (month, year) => {
  return API.get(`${API_URL}/month/${month}/year/${year}`);
};

// ===============================
// Mark As Paid
// ===============================
export const markAsPaid = (id) => {
  return API.put(`${API_URL}/${id}/paid`);
};

// ===============================
// Mark As Pending
// ===============================
export const markAsPending = (id) => {
  return API.put(`${API_URL}/${id}/pending`);
};
