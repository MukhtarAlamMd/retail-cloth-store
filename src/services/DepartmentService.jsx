import API from "./AxiosConfig";

const API_URL = "http://localhost:8081/api/departments";

// ==============================
// Get All Departments
// ==============================

export const listDepartments = () => API.get(API_URL);

// ==============================
// Get Department By Id
// ==============================

export const getDepartmentById = (id) => API.get(`${API_URL}/${id}`);

// ==============================
// Create Department
// ==============================

export const createDepartment = (department) => API.post(API_URL, department);

// ==============================
// Update Department
// ==============================

export const updateDepartment = (id, department) =>
  API.put(`${API_URL}/${id}`, department);

// ==============================
// Delete Department
// ==============================

export const deleteDepartment = (id) => API.delete(`${API_URL}/${id}`);

// ==============================
// Search By Department Name
// ==============================

export const searchDepartmentByName = (keyword) =>
  API.get(`${API_URL}/search/name?keyword=${keyword}`);

// ==============================
// Search By Department Code
// ==============================

export const searchDepartmentByCode = (keyword) =>
  API.get(`${API_URL}/search/code?keyword=${keyword}`);

// ==============================
// Filter By Status
// ==============================

export const getDepartmentsByStatus = (status) =>
  API.get(`${API_URL}/status/${status}`);
