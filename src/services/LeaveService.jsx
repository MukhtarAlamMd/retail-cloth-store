import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/leaves";

// =========================
// Get All Leaves
// =========================
export const listLeaves = () => {
  return API.get(API_URL);
};

// =========================
// Get Leave By Id
// =========================
export const getLeaveById = (id) => {
  return API.get(`${API_URL}/${id}`);
};

// =========================
// Create Leave
// =========================
export const createLeave = (leave) => {
  return API.post(API_URL, leave);
};

// =========================
// Update Leave
// =========================
export const updateLeave = (id, leave) => {
  return API.put(`${API_URL}/${id}`, leave);
};

// =========================
// Delete Leave
// =========================
export const deleteLeave = (id) => {
  return API.delete(`${API_URL}/${id}`);
};

// =========================
// Get Leave By Employee
// =========================
export const getLeavesByEmployee = (employeeId) => {
  return API.get(`${API_URL}/employee/${employeeId}`);
};

// =========================
// Get Leave By Status
// =========================
export const getLeavesByStatus = (status) => {
  return API.get(`${API_URL}/status/${status}`);
};

// =========================
// Approve Leave
// =========================
export const approveLeave = (id) => {
  return API.put(`${API_URL}/${id}/approve`);
};

// =========================
// Reject Leave
// =========================
export const rejectLeave = (id) => {
  return API.put(`${API_URL}/${id}/reject`);
};
