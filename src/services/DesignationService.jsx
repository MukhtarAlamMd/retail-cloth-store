import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/designations";

// =======================================
// Get All Designations
// =======================================

export const listDesignations = () => API.get(API_URL);

// =======================================
// Get Designation By Id
// =======================================

export const getDesignationById = (id) => API.get(`${API_URL}/${id}`);

// =======================================
// Create Designation
// =======================================

export const createDesignation = (designation) =>
  API.post(API_URL, designation);

// =======================================
// Update Designation
// =======================================

export const updateDesignation = (id, designation) =>
  API.put(`${API_URL}/${id}`, designation);

// =======================================
// Delete Designation
// =======================================

export const deleteDesignation = (id) => API.delete(`${API_URL}/${id}`);

// =======================================
// Search By Designation Name
// =======================================

export const searchDesignationByName = (keyword) =>
  API.get(`${API_URL}/search/name?keyword=${keyword}`);

// =======================================
// Search By Designation Code
// =======================================

export const searchDesignationByCode = (keyword) =>
  API.get(`${API_URL}/search/code?keyword=${keyword}`);

// =======================================
// Filter By Status
// =======================================

export const getDesignationsByStatus = (status) =>
  API.get(`${API_URL}/status/${status}`);

// =======================================
// Filter By Department
// =======================================

export const getDesignationsByDepartment = (departmentId) =>
  API.get(`${API_URL}/department/${departmentId}`);
