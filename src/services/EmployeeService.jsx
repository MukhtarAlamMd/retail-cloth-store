import API from "./AxiosConfig";

const API_URL = "/api/employees";

// Get All Employees
export const listEmployees = () => API.get(API_URL);

// Create Employee
export const createEmployee = (employee) => API.post(API_URL, employee);

// Get Employee By Id
export const getEmployeeById = (id) => API.get(`${API_URL}/${id}`);

// Update Employee
export const updateEmployee = (id, employee) =>
  API.put(`${API_URL}/${id}`, employee);

// Delete Employee
export const deleteEmployee = (id) => API.delete(`${API_URL}/${id}`);

// Search Employee
export const searchEmployee = (keyword) =>
  API.get(`${API_URL}/search?keyword=${keyword}`);
